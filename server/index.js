// server/index.js (ESM)
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  LISTINGS, bookings, isFree, createHold,
  consumeHold, confirmBooking, getBlockedDates,
  findHostByEmail, findHostById, createHost, findHostByListingId,
  getBookingsForHost, addBlockedDate, removeBlockedDateByHost,
  getAllBlockedDatesForHost
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

// Default Stripe instance (for backwards compatibility and webhook verification)
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })
  : null;

/** HEALTH CHECK */
app.get('/api/health', (_,res)=>res.json({ ok: true }));

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
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
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
      success_url: `${process.env.SITE_URL}/?success=1&session_id={CHECKOUT_SESSION_ID}`,
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
      metadata: { listingId: listing, start, end, holdId }
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

app.get('/api/blocked', (req,res)=>{
  const listing = (req.query.listing || LISTINGS[0].id);
  const from = String(req.query.from); // inclusive YYYY-MM-DD
  const to   = String(req.query.to);   // exclusive YYYY-MM-DD
  if (!from || !to) return res.status(400).json({ error: 'from and to (YYYY-MM-DD) required' });
  const blocked = getBlockedDates(listing, from, to);
  res.json({ listing, from, to, blocked });
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

// HOST 1 LOGIN CREDENTIALS
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
