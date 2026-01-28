// server/index.js (ESM)
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Stripe from 'stripe';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  LISTINGS, bookings, isFree, createHold,
  consumeHold, confirmBooking, getBlockedDates,
  findHostByEmail, findHostById, createHost, findHostByListingId,
  getBookingsForHost, addBlockedDate,   removeBlockedDateByHost,
  getAllBlockedDatesForHost, hosts, createLead
} from './store.js';

// Helper function to get Stripe instance for a specific host
function getStripeForHost(host) {
  // If host has a specific Stripe key ID, use that; otherwise use default
  if (host.stripeSecretKeyId) {
    const hostKey = process.env[`STRIPE_SECRET_KEY_${host.stripeSecretKeyId.toUpperCase()}`];
    if (hostKey) {
      return new Stripe(hostKey, { apiVersion: '2023-10-16' });
    }
    console.warn(`No Stripe key found for host ${host.id} with keyId ${host.stripeSecretKeyId}, using default`);
  }
  // Fallback to default Stripe key
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY not set in environment variables');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
}

// Load server/.env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('SENDGRID_API_KEY not found in environment variables. Email sending disabled.');
}

// Default Stripe instance (for backwards compatibility and webhook verification)
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })
  : null;

/** HEALTH CHECK */
app.get('/api/health', (_, res) => res.json({ ok: true }));

/** Stripe webhook FIRST (raw body). Only needed if you test webhooks. */
app.post('/api/stripe-webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    // First, try to find which host this webhook is for by checking the event
    // We'll verify the signature with the appropriate secret after identifying the host
    let event;
    let host = null;

    // Try to parse event to get listing ID (we'll need to verify signature later)
    try {
      const rawBody = req.body;
      const parsed = JSON.parse(rawBody.toString());

      if (parsed.type === 'checkout.session.completed' && parsed.data?.object?.metadata?.listingId) {
        const listingIdStr = String(parsed.data.object.metadata.listingId);
        host = findHostByListingId(listingIdStr);
      }
    } catch (e) {
      // If we can't parse, we'll try default verification
    }

    // Get webhook secret for this host (or use default)
    let webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (host && host.stripeSecretKeyId) {
      const hostWebhookSecret = process.env[`STRIPE_WEBHOOK_SECRET_${host.stripeSecretKeyId.toUpperCase()}`];
      if (hostWebhookSecret) {
        webhookSecret = hostWebhookSecret;
      }
    }

    if (!webhookSecret) {
      console.error('No webhook secret found');
      return res.status(400).send('Webhook Error: No webhook secret configured');
    }

    // Verify webhook signature
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        webhookSecret
      );
    } catch (err) {
      // If default failed and we have a host, try with host's Stripe instance
      if (host && host.stripeSecretKeyId) {
        try {
          const hostStripe = getStripeForHost(host);
          event = hostStripe.webhooks.constructEvent(
            req.body,
            req.headers['stripe-signature'],
            webhookSecret
          );
        } catch (err2) {
          console.error('Webhook signature failed', err2.message);
          return res.status(400).send(`Webhook Error: ${err2.message}`);
        }
      } else {
        console.error('Webhook signature failed', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
    }

    if (event.type === 'checkout.session.completed') {
      const s = event.data.object;
      const { listingId, start, end, holdId } = s.metadata || {};
      const listingIdStr = String(listingId);

      // Find which host owns this listing (if not already found)
      if (!host) {
        host = findHostByListingId(listingIdStr);
      }

      if (!host) {
        console.error(`No host found for listing ${listingIdStr}`);
        return res.json({ received: true, error: 'Host not found for listing' });
      }

      const hold = consumeHold(String(holdId));
      if (hold && isFree(listingIdStr, String(start), String(end))) {
        confirmBooking(
          host.id, // hostId - links booking to specific host
          listingIdStr,
          String(start),
          String(end),
          s.customer_details?.email,
          s.customer_details?.phone,
          s.id
        );
      } else {
        console.warn('Conflict detected after payment (test env).');
        // Optionally issue a refund in test mode here
      }
    }
    res.json({ received: true });
  }
);

/** other middleware AFTER webhook */
app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    // In development, allow localhost and local network IPs
    const isLocalhost = !origin ||
      origin.startsWith('http://localhost:') ||
      origin.startsWith('http://127.0.0.1:') ||
      origin.startsWith('http://192.168.');

    if (isLocalhost || origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      console.error(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());
app.use(cookieParser());

// Auth middleware
function authenticateToken(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Authentication required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

/** Availability */
app.get('/api/availability', (req, res) => {
  const listing = req.query.listing || LISTINGS[0].id;
  const { start, end } = req.query;
  if (!start || !end) return res.status(400).json({ error: 'start and end YYYY-MM-DD required' });
  return res.json({ listing, start, end, available: isFree(listing, start, end) });
});

/** Hold */
app.post('/api/hold', (req, res) => {
  const listing = req.body.listing || LISTINGS[0].id;
  const { start, end } = req.body;
  if (!start || !end) return res.status(400).json({ error: 'start and end required' });
  if (!isFree(listing, start, end)) return res.status(409).json({ error: 'Dates no longer available' });
  const hold = createHold(listing, start, end, 10);
  res.json({ hold });
});

/** Release hold */
app.delete('/api/hold/:holdId', (req, res) => {
  const { holdId } = req.params;
  if (!holdId) return res.status(400).json({ error: 'holdId required' });
  const hold = consumeHold(String(holdId));
  if (!hold) return res.status(404).json({ error: 'Hold not found' });
  res.json({ success: true, hold });
});

/** Checkout */
app.post('/api/checkout', async (req, res) => {
  const listing = req.body.listing || LISTINGS[0].id;
  const { start, end, holdId } = req.body;
  if (!start || !end || !holdId) {
    return res.status(400).json({ error: 'start, end, holdId required' });
  }

  const L = LISTINGS.find(l => l.id === listing);
  if (!L) {
    return res.status(404).json({ error: 'Listing not found' });
  }

  // Find which host owns this listing to get their Stripe key
  const host = findHostByListingId(listing);
  if (!host) {
    return res.status(404).json({ error: 'Host not found for listing' });
  }

  const hostStripe = getStripeForHost(host);

  const nights = Math.max(
    1,
    Math.round((Date.parse(end + 'T00:00:00') - Date.parse(start + 'T00:00:00')) / (24 * 3600 * 1000))
  );

  try {
    const session = await hostStripe.checkout.sessions.create({
      mode: 'payment',
      // If you add a dedicated Success page later, send session_id so you can fetch its details.
      success_url: `${process.env.SITE_URL}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/?canceled=1`,

      // 🧾 Itemized line items (looks more professional than one lump sum)
      line_items: [
        {
          quantity: nights,
          price_data: {
            currency: 'usd',
            unit_amount: L.nightlyPrice, // per-night
            product_data: {
              name: `${L.title} — Nightly rate`,
              description: `${start} → ${end} (${nights} night${nights > 1 ? 's' : ''})`
              // images: ['https://yourdomain.com/photos/cabin1.jpg'], // optional, looks nice
            }
          }
        },
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: L.cleaningFee,
            product_data: {
              name: 'Cleaning fee',
              description: 'One-time'
            }
          }
        }
      ],

      // 📣 Looks/UX
      allow_promotion_codes: true,                // let guests apply coupons
      locale: 'auto',                              // Stripe auto-picks locale
      customer_creation: 'always',                 // creates a Customer (useful for receipts & future bookings)
      billing_address_collection: 'auto',          // collect billing address when needed
      phone_number_collection: { enabled: true },  // ask for phone (handy for hosts)

      // 🧾 Tax (turn on if you want Stripe to estimate/collect)
      // automatic_tax: { enabled: true },

      // ✅ ToS consent (set your policy URLs in Stripe Dashboard → Branding → Policies)
      // Temporarily disabled for testing - uncomment and add ToS URL in Stripe Dashboard for production
      // consent_collection: { terms_of_service: 'required' },

      // 💌 After submit note (small text under the button)
      custom_text: {
        submit: {
          message: 'By confirming, you agree to our House Rules and Cancellation Policy.'
        }
      },

      // 🔁 If they abandon checkout, send them a recovery link email
      after_expiration: {
        recovery: { enabled: true }
      },

      // 🔗 Helpful to reconcile on your side / in Stripe
      client_reference_id: holdId,

      // Keep your original metadata for the webhook & DB
      metadata: {
        listingId: listing,
        start,
        end,
        holdId,
        origin: req.headers.origin // Save the origin (e.g. http://localhost:5175)
      }
    });

    return res.json({ url: session.url });
  } catch (e) {
    console.error('Stripe checkout error:', e);
    return res.status(500).json({ error: String(e.message || e) });
  }
});

// After checkout screen
app.get('/api/checkout-session', async (req, res) => {
  try {
    const { session_id, listing } = req.query;
    if (!session_id) return res.status(400).json({ error: 'session_id required' });

    // Find host to get their Stripe instance
    const listingId = listing || LISTINGS[0].id;
    const host = findHostByListingId(listingId);
    const hostStripe = host ? getStripeForHost(host) : stripe;

    if (!hostStripe) {
      return res.status(500).json({ error: 'Stripe not configured' });
    }

    const session = await hostStripe.checkout.sessions.retrieve(String(session_id), {
      expand: ['line_items.data.price.product', 'customer']
    });

    return res.json({
      id: session.id,
      amount_total: session.amount_total,
      currency: session.currency,
      email: session.customer_details?.email,
      phone: session.customer_details?.phone,
      line_items: session.line_items?.data?.map(li => ({
        description: li.description,
        quantity: li.quantity,
        amount_subtotal: li.amount_subtotal,
        amount_total: li.amount_total
      })) || [],
      metadata: session.metadata
    });
  } catch (e) {
    console.error('get session error', e);
    res.status(500).json({ error: 'Failed to retrieve session' });
  }
});

// Booking confirmation details - combines Stripe session + our booking data
app.get('/api/booking-session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) return res.status(400).json({ error: 'sessionId required' });

    // First, retrieve the Stripe session to get metadata
    // We need to figure out which host's Stripe instance to use
    // Try default first, then specific host if we can identify from booking
    let session = null;
    let hostStripe = stripe;

    // Try with default Stripe instance first
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch (e) {
      // If default fails, try finding it with any of the hosts' keys
      // This is necessary because we don't know which host created the session yet
      let found = false;
      for (const host of hosts) {
        try {
          const hostStripe = getStripeForHost(host);
          // Skip if it's the same as default to avoid redundant calls
          if (hostStripe === stripe) continue;

          session = await hostStripe.checkout.sessions.retrieve(sessionId);
          if (session) {
            found = true;
            hostStripe = hostStripe; // Keep reference to the working stripe instance
            break;
          }
        } catch (err) {
          // Continue to next host
        }
      }

      if (!found) {
        console.error('Session not found with any configured Stripe key');
        return res.status(404).json({ error: 'Session not found' });
      }
    }

    const { listingId, start, end } = session.metadata || {};

    if (!listingId) {
      return res.status(400).json({ error: 'No listing metadata in session' });
    }

    // Find the listing details
    const listing = LISTINGS.find(l => l.id === listingId);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Find the booking in our store
    let booking = bookings.find(b => b.stripeSessionId === sessionId);

    // DEV MODE FALLBACK: If webhook didn't fire (no CLI), confirm it now if paid
    if (!booking && session.payment_status === 'paid') {
      console.log('Dev fallback: Confirming booking via frontend check (webhook missing)');
      const { listingId, start, end, holdId } = session.metadata || {};

      // Need to find host to get ID for confirmation
      const host = findHostByListingId(listingId);

      if (listingId && start && end) {
        // Try to consume hold if it exists, otherwise just proceed
        try { consumeHold(String(holdId)); } catch (e) { }

        booking = confirmBooking(
          host ? host.id : 'host_default', // Use found host ID or default
          String(listingId),
          String(start),
          String(end),
          session.customer_details?.email,
          session.customer_details?.phone,
          session.id
        );
      }
    }

    if (!booking) {
      // Booking might not exist yet if webhook hasn't processed AND fallback failed
      // Return session data anyway for confirmation display
      return res.json({
        booking: {
          id: 'pending',
          listingId: listingId,
          propertyName: listing.title,
          checkIn: start,
          checkOut: end,
          nights: Math.round((Date.parse(end + 'T00:00:00') - Date.parse(start + 'T00:00:00')) / (24 * 3600 * 1000)),
          total: session.amount_total,
          guestEmail: session.customer_details?.email,
          guestPhone: session.customer_details?.phone,
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      });
    }

    // Return full booking details
    const nights = Math.round((Date.parse(booking.end + 'T00:00:00') - Date.parse(booking.start + 'T00:00:00')) / (24 * 3600 * 1000));

    // Find the host to get the site URL
    const host = findHostByListingId(booking.listingId);
    let siteUrl = '/';
    if (host) {
      // In production this would be their actual domain
      // In dev we might need to know their port, but for now we'll link to the main site 
      // with a query param or if we know the dev port mapping
      // For this specific demo, we know coral-breeze is usually on 5174/5175
      // But safer to just return the main site with a query param that the main site handles
      // OR if we want to be fancy, we can try to guess the dev port

      // BETTER APPROACH: Return the full URL if known, otherwise relative
      // For the demo, let's assume it's the same domain/port if it's a path-based routing
      // But since we are running separate vite servers on different ports...

      // Let's just return the listing page on the main site as a fallback
      // unless we have a specific URL stored
      // Use the origin from session metadata if available (best for dev ports)
      siteUrl = session.metadata?.origin || host.siteUrl || `/?listing=${booking.listingId}`;
    }

    return res.json({
      booking: {
        id: booking.id,
        listingId: booking.listingId,
        propertyName: listing.title,
        checkIn: booking.start,
        checkOut: booking.end,
        nights: nights,
        total: session.amount_total,
        guestEmail: booking.customerEmail || session.customer_details?.email,
        guestPhone: booking.customerPhone || session.customer_details?.phone,
        status: booking.status,
        createdAt: booking.createdAt,
        siteUrl: siteUrl // Add this field
      }
    });
  } catch (e) {
    console.error('get booking session error', e);
    res.status(500).json({ error: 'Failed to retrieve booking details' });
  }
});

/** ICS export (Airbnb import) */
app.get('/api/calendar/:listing.ics', (req, res) => {
  const listing = req.params.listing || LISTINGS[0].id;
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//YourBrand//DirectBooking//EN'];
  for (const b of bookings) {
    if (b.listingId !== listing || b.status !== 'confirmed') continue;
    const uid = `booking-${b.id}@yourdomain.com`;
    const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    lines.push('BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${b.start.replace(/-/g, '')}`,
      `DTEND;VALUE=DATE:${b.end.replace(/-/g, '')}`,
      `SUMMARY:Direct booking - ${listing}`,
      'END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="calendar.ics"');
  res.send(lines.join('\r\n'));
});

app.get('/api/blocked', (req, res) => {
  const listing = (req.query.listing || LISTINGS[0].id);
  const from = String(req.query.from); // inclusive YYYY-MM-DD
  const to = String(req.query.to);   // exclusive YYYY-MM-DD
  if (!from || !to) return res.status(400).json({ error: 'from and to (YYYY-MM-DD) required' });
  const blocked = getBlockedDates(listing, from, to);
  res.json({ listing, from, to, blocked });
});

/** Hostex Reviews API Proxy */
// Simple in-memory cache for reviews (5 minute TTL)
const reviewsCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

app.get('/api/hostex/reviews/:propertyId', async (req, res) => {
  const { propertyId } = req.params;
  const limit = parseInt(req.query.limit) || 10;

  const hostexToken = process.env.HOSTEX_ACCESS_TOKEN;
  if (!hostexToken) {
    console.error('HOSTEX_ACCESS_TOKEN not configured');
    return res.status(500).json({ error: 'Hostex API not configured' });
  }

  // Check cache first
  const cacheKey = `${propertyId}-${limit}`;
  const cached = reviewsCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
    return res.json(cached.data);
  }

  try {
    const response = await fetch(
      `https://api.hostex.io/v3/reviews?property_id=${propertyId}&limit=${limit}`,
      {
        headers: {
          'Hostex-Access-Token': hostexToken
        }
      }
    );

    if (!response.ok) {
      console.error('Hostex API error:', response.status);
      return res.status(response.status).json({ error: 'Failed to fetch reviews from Hostex' });
    }

    const data = await response.json();
    // Transform reviews to a simpler format for the frontend
    const reviews = (data.data?.reviews || [])
      .filter(r => r.guest_review && r.guest_review.content) // Only include reviews with guest content
      .map(r => {
        // Try to extract name from host review if available
        let extractedName = null;
        if (r.host_review?.content) {
          // Look for "Name was..." pattern
          const match = r.host_review.content.match(/^([A-Z][a-z]+) was/);
          if (match) extractedName = match[1];
        }

        return {
          id: r.reservation_code,
          guestName: r.guest_name || extractedName || (r.guest_review?.content ? 'Guest' : null),
          score: r.guest_review?.score || 5,
          content: r.guest_review?.content,
          date: r.guest_review?.created_at,
          checkIn: r.check_in_date,
          checkOut: r.check_out_date,
          channel: r.channel_type,
          photos: r.guest_review?.photos || null
        };
      });

    const result = { reviews, total: reviews.length };

    // Cache the result
    reviewsCache.set(cacheKey, { data: result, timestamp: Date.now() });

    res.json(result);
  } catch (error) {
    console.error('Error fetching Hostex reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Simple in-memory cache for availabilities (5 minute TTL)
const availabilityCache = new Map();

app.get('/api/hostex/availability/:propertyId', async (req, res) => {
  const { propertyId } = req.params;
  const hostexToken = process.env.HOSTEX_ACCESS_TOKEN;

  if (!hostexToken) {
    console.error('HOSTEX_ACCESS_TOKEN not configured');
    return res.status(500).json({ error: 'Hostex API not configured' });
  }

  // Check cache first
  const cached = availabilityCache.get(propertyId);
  if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
    return res.json(cached.data);
  }

  try {
    // We fetch a wide range to cover possible user selections (e.g., next 2 years)
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split('T')[0];

    const response = await fetch(
      `https://api.hostex.io/v3/availabilities?property_ids=${propertyId}&start_date=${startDate}&end_date=${endDate}`,
      {
        headers: {
          'Hostex-Access-Token': hostexToken
        }
      }
    );

    if (!response.ok) {
      console.error('Hostex Availability API error:', response.status);
      return res.status(response.status).json({ error: 'Failed to fetch availability from Hostex' });
    }

    const data = await response.json();

    // Extract only the unavailable/blocked dates for easier consumption
    const propertyData = data.data?.properties?.find(p => String(p.id) === String(propertyId));
    if (!propertyData) {
      return res.json({ blockedDates: [] });
    }

    const blockedDates = propertyData.availabilities
      .filter(a => a.available === false)
      .map(a => a.date);

    const result = { blockedDates };

    // Cache the result
    availabilityCache.set(propertyId, { data: result, timestamp: Date.now() });

    res.json(result);
  } catch (error) {
    console.error('Error fetching Hostex availability:', error);
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
});

/** Authentication endpoints */
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const host = findHostByEmail(email);
  if (!host) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, host.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    {
      id: host.id,
      email: host.email,
      hostId: host.id, // For clarity in middleware
      websiteId: host.websiteId,
      listingIds: host.listingIds
    },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: '7d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.json({
    token,
    host: {
      id: host.id,
      email: host.email,
      listingIds: host.listingIds,
      websiteId: host.websiteId,
      sitePath: host.sitePath
    }
  });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

app.get('/api/me', authenticateToken, (req, res) => {
  const host = findHostById(req.user.id);
  if (!host) {
    return res.status(404).json({ error: 'Host not found' });
  }
  // Get property names from listingIds
  const propertyNames = host.listingIds
    .map(listingId => LISTINGS.find(l => l.id === listingId)?.title)
    .filter(Boolean);
  const primaryPropertyName = propertyNames[0] || null;

  res.json({
    host: {
      id: host.id,
      email: host.email,
      listingIds: host.listingIds,
      websiteId: host.websiteId,
      sitePath: host.sitePath,
      propertyNames: propertyNames,
      primaryPropertyName: primaryPropertyName
    }
  });
});

/** Dashboard endpoints (protected) */
app.get('/api/dashboard/bookings', authenticateToken, (req, res) => {
  const hostId = req.user.hostId || req.user.id; // Support both token formats
  const host = findHostById(hostId);
  if (!host) return res.status(404).json({ error: 'Host not found' });

  // Get bookings filtered by hostId - only this host's bookings
  const allBookings = getBookingsForHost(hostId);

  // Enrich with listing titles
  const enrichedBookings = allBookings.map(b => ({
    ...b,
    listingTitle: LISTINGS.find(l => l.id === b.listingId)?.title || b.listingId
  }));

  res.json({ bookings: enrichedBookings });
});

app.get('/api/dashboard/customers', authenticateToken, (req, res) => {
  const hostId = req.user.hostId || req.user.id;
  const host = findHostById(hostId);
  if (!host) return res.status(404).json({ error: 'Host not found' });

  // Get bookings filtered by hostId - only this host's bookings
  const allBookings = getBookingsForHost(hostId);

  const customersMap = new Map();

  for (const booking of allBookings) {
    if (booking.customerEmail) {
      const key = booking.customerEmail.toLowerCase();
      if (!customersMap.has(key)) {
        customersMap.set(key, {
          email: booking.customerEmail,
          phone: booking.customerPhone,
          bookings: [],
          totalSpent: 0
        });
      }
      const customer = customersMap.get(key);
      customer.bookings.push({
        id: booking.id,
        listingId: booking.listingId,
        listingTitle: LISTINGS.find(l => l.id === booking.listingId)?.title || booking.listingId,
        start: booking.start,
        end: booking.end,
        createdAt: booking.createdAt
      });
    }
  }

  const customers = Array.from(customersMap.values());
  res.json({ customers });
});

app.get('/api/dashboard/blocked-dates', authenticateToken, (req, res) => {
  const hostId = req.user.hostId || req.user.id;
  const host = findHostById(hostId);
  if (!host) return res.status(404).json({ error: 'Host not found' });

  // Get all blocked dates for this host's listings (manual + external blocks)
  const allBlocks = getAllBlockedDatesForHost(hostId).map(b => ({
    ...b,
    listingTitle: LISTINGS.find(l => l.id === b.listingId)?.title || b.listingId,
    isManual: b.type === 'manual', // Indicate if it's a manual block (can be deleted)
    source: b.source || (b.type === 'manual' ? 'manual' : 'external') // Indicate source
  }));

  res.json({ blockedDates: allBlocks });
});

app.post('/api/dashboard/blocked-dates', authenticateToken, (req, res) => {
  const hostId = req.user.hostId || req.user.id;
  const host = findHostById(hostId);
  if (!host) return res.status(404).json({ error: 'Host not found' });

  const { listingId, start, end, note } = req.body;
  if (!listingId || !start || !end) {
    return res.status(400).json({ error: 'listingId, start, and end required' });
  }

  // Security: ensure host owns this listing
  if (!host.listingIds.includes(listingId)) {
    return res.status(403).json({ error: 'You do not have access to this listing' });
  }

  // Add blocked date with hostId scoping
  const block = addBlockedDate(hostId, listingId, start, end, note || '');
  res.json({ blockedDate: block });
});

app.delete('/api/dashboard/blocked-dates/:blockId', authenticateToken, (req, res) => {
  const hostId = req.user.hostId || req.user.id;
  const host = findHostById(hostId);
  if (!host) return res.status(404).json({ error: 'Host not found' });

  const { blockId } = req.params;

  // Remove blocked date with hostId validation (ensures host owns the block)
  const removed = removeBlockedDateByHost(blockId, hostId);

  if (!removed) {
    return res.status(404).json({ error: 'Blocked date not found or access denied' });
  }

  res.json({ success: true, blockedDate: removed });
});

/** Lead Capture Endpoint */
app.post('/api/leads', async (req, res) => {
  const { email, name, experience, propertyCount, goal, listingUrl } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  
  // Create and save lead
  const leadData = { 
    email, 
    name, 
    experience, 
    propertyCount, 
    goal, 
    listingUrl,
    createdAt: new Date().toISOString() 
  };
  
  // In a real app, you would save to database here
  // const lead = createLead(leadData); 
  console.log(`[LEAD CAPTURE] New sign up: ${email} (${name || 'No name'})`);
  console.log('Lead Details:', leadData);

  // Send Welcome Email via SendGrid
  if (process.env.SENDGRID_API_KEY) {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'stillhousemedia@outlook.com',
      subject: 'Welcome to Still House Media',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #0f172a;">Welcome to the Future of Hosting</h1>
          <p>Hi ${name || 'there'},</p>
          <p>Thanks for starting your direct booking journey with Still House Media. We've received your strategy assessment.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Profile Summary:</h3>
            <ul style="padding-left: 20px;">
              <li><strong>Experience:</strong> ${experience || 'N/A'}</li>
              <li><strong>Portfolio Size:</strong> ${propertyCount || 'N/A'} properties</li>
              <li><strong>Primary Goal:</strong> ${goal === 'fees' ? 'Eliminate Fees' : goal === 'data' ? 'Own Guest Data' : 'Automation'}</li>
            </ul>
          </div>

          <p>One of our direct booking strategists is reviewing your details (and your listing at ${listingUrl || 'your link'}) right now.</p>
          <p>We will reach out shortly with a custom ROI analysis showing exactly how much you could save.</p>
          
          <p>Talk soon,<br/>The Still House Media Team</p>
        </div>
      `,
    };

    try {
      await sgMail.send(msg);
      console.log(`[EMAIL] Welcome email sent to ${email}`);
    } catch (error) {
      console.error('[EMAIL ERROR]', error);
      if (error.response) {
        console.error(error.response.body);
      }
      // Don't fail the request if email fails, just log it
    }
  } else {
    console.log('[EMAIL] Skipping email send (API key missing)');
  }
  
  res.json({ success: true, message: 'Welcome to the waitlist!', lead: leadData });
});

// Initialize a default host for demo (password: 'password')
if (process.env.NODE_ENV !== 'production') {
  (async () => {
    const defaultEmail = 'host@example.com';
    if (!findHostByEmail(defaultEmail)) {
      const passwordHash = await bcrypt.hash('password', 10);
      createHost(
        defaultEmail,
        passwordHash,
        [LISTINGS[0].id],
        LISTINGS[0].id, // websiteId defaults to first listing ID
        null, // sitePath (can be set when creating actual host sites)
        null, // stripeAccountId (can be set when setting up Stripe)
        null  // stripeSecretKeyId (leave null to use default STRIPE_SECRET_KEY)
      );
      console.log(`Default host created: ${defaultEmail} / password`);
    }
  })();
}

// HOST 1 LOGIN CREDENTIALS (coral breeze estate)
(async () => {
  const hostEmail = 'stillhousemedia@outlook.com';
  const hostPassword = 'OregonSpain2025!!'; // Generate a secure password
  const listingId = 'coral-breeze-estate'; // Match the listing ID from Step 4

  // Stripe key identifier - must match the suffix in server/.env
  // For example, if you used STRIPE_SECRET_KEY_HOST1 in .env, use 'HOST1' here
  // If you used STRIPE_SECRET_KEY_MOUNTAIN_CABIN, use 'MOUNTAIN_CABIN' here
  // Leave as null to use the default STRIPE_SECRET_KEY
  const stripeSecretKeyId = 'CORAL_BREEZE_ESTATE'; // or null, or 'MOUNTAIN_CABIN', etc.

  if (!findHostByEmail(hostEmail)) {
    const passwordHash = await bcrypt.hash(hostPassword, 10);
    createHost(
      hostEmail,
      passwordHash,
      [listingId],                    // Array of listing IDs they manage
      listingId,                     // websiteId (usually same as listing)
      'hosts/coral-breeze-estate',   // Path to their frontend folder
      'acct_stripe_account_id',      // Their Stripe account ID (optional, for reference)
      stripeSecretKeyId              // Stripe key identifier (matches .env variable suffix)
    );
    console.log(`Host created: ${hostEmail} / ${hostPassword}`);
    console.log(`  Using Stripe key: ${stripeSecretKeyId || 'default (STRIPE_SECRET_KEY)'}`);
  }
})();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
