# Host Onboarding Guide

## Step-by-Step Process

### Step 1: Create the Host's Frontend Website Folder

1. **Create a new folder** for the host's website:
   ```bash
   mkdir hosts/your-host-name
   ```

2. **Copy the template folder** into it:
   ```bash
   cp -r hosts/_template/* hosts/your-host-name/
   ```
   (Or manually copy all files from `hosts/_template/` to `hosts/your-host-name/`)

### Step 2: Customize the Frontend

1. **Edit `hosts/your-host-name/src/site-config.js`**:
   - Update property name, location, description
   - Add their photos paths
   - Set pricing (nightly rate and cleaning fee in cents)
   - Add amenities, highlights, reviews
   - Add contact info

2. **Add their photos** to `hosts/your-host-name/public/photos/`:
   - Hero image (main cover photo)
   - Gallery photos (at least 3-5 photos)

3. **Test the site locally**:
   ```bash
   cd hosts/your-host-name
   npm install
   npm run dev
   ```

### Step 3: Set Up Stripe Account

1. **Have the host create a Stripe account** (or create one for them)
   - Go to [stripe.com](https://stripe.com) and sign up
   - For testing, use **Test mode** (toggle in top right of Stripe Dashboard)
   - For production, switch to **Live mode** and complete account verification

2. **Get their Stripe keys**:
   - Stripe Dashboard → **Developers** → **API keys**
   - You'll see two keys:
     - **Publishable key** (starts with `pk_test_` or `pk_live_`) - This is safe to expose in frontend code
     - **Secret key** (starts with `sk_test_` or `sk_live_`) - This must be kept secret, never expose it in frontend code
   - Copy both keys (you'll add them to environment variables in Step 6)

3. **Set up webhook** (optional but **highly recommended**):
   
   **What is a webhook?**
   A webhook is a way for Stripe to automatically notify your server when important events happen (like when a payment is completed). Without a webhook, you'd have to manually check if payments succeeded, which is unreliable and requires extra work.
   
   **Why you need it:**
   - When a guest completes payment on Stripe's checkout page, Stripe sends a webhook notification to your server
   - Your server then automatically confirms the booking in your system
   - This ensures bookings are confirmed immediately after payment, without any manual intervention
   - Without it, bookings might not be confirmed automatically, leading to missed bookings or manual work
   
   **How to set it up:**
   - In Stripe Dashboard → **Developers** → **Webhooks**
   - Click **"Add endpoint"**
   - Enter endpoint URL: `https://yourdomain.com/api/stripe-webhook` (replace with your actual domain)
   - Select event to listen to: **`checkout.session.completed`** (this fires when payment is successful)
   - Click **"Add endpoint"**
   - Stripe will show you a **Webhook signing secret** (starts with `whsec_`) - Copy this immediately, you'll need it in Step 6
   - **Note:** For local testing, you can use Stripe CLI to forward webhooks to your local server (see Stripe docs for details)

### Step 4: Create the Listing in Backend

1. **Open `server/store.js`**
2. **Add a new listing** to the `LISTINGS` array:
   ```javascript
   {
     id: 'unique-listing-id', // e.g., 'mountain-view-cabin'
     title: 'Mountain View Cabin',
     timezone: 'America/Los_Angeles',
     nightlyPrice: 25000, // $250.00 in cents
     cleaningFee: 9500     // $95.00 in cents
   }
   ```

### Step 5: Create Host Login Credentials

1. **Open `server/index.js`** (or create a script to do this)
2. **Add host creation code** in the initialization section or create them manually:

```javascript
// In server/index.js, add to the initialization section:
(async () => {
  const hostEmail = 'host@theirproperty.com';
  const hostPassword = 'secure-password-here'; // Generate a secure password
  const listingId = 'unique-listing-id'; // Match the listing ID from Step 4
  
  // Stripe key identifier - must match the suffix in server/.env
  // For example, if you used STRIPE_SECRET_KEY_HOST1 in .env, use 'HOST1' here
  // If you used STRIPE_SECRET_KEY_MOUNTAIN_CABIN, use 'MOUNTAIN_CABIN' here
  // Leave as null to use the default STRIPE_SECRET_KEY
  const stripeSecretKeyId = 'HOST1'; // or null, or 'MOUNTAIN_CABIN', etc.
  
  if (!findHostByEmail(hostEmail)) {
    const passwordHash = await bcrypt.hash(hostPassword, 10);
    createHost(
      hostEmail,
      passwordHash,
      [listingId],                    // Array of listing IDs they manage
      listingId,                     // websiteId (usually same as listing)
      'hosts/your-host-name',        // Path to their frontend folder
      'acct_stripe_account_id',      // Their Stripe account ID (optional, for reference)
      stripeSecretKeyId              // Stripe key identifier (matches .env variable suffix)
    );
    console.log(`Host created: ${hostEmail} / ${hostPassword}`);
    console.log(`  Using Stripe key: ${stripeSecretKeyId || 'default (STRIPE_SECRET_KEY)'}`);
  }
})();
```

**About `stripeSecretKeyId`:**
- This identifier tells the server which Stripe secret key to use from `server/.env`
- If set to `'HOST1'`, the server will look for `STRIPE_SECRET_KEY_HOST1` in the environment
- If set to `null`, the server will use the default `STRIPE_SECRET_KEY`
- The value must match the suffix you used in your `server/.env` file (case-insensitive)
- Example: If your `.env` has `STRIPE_SECRET_KEY_MOUNTAIN_CABIN`, use `'MOUNTAIN_CABIN'` or `'mountain_cabin'`

### Step 6: Configure Environment Variables

This is where you'll add the Stripe keys you copied in Step 3. There are two places to put them:

1. **Frontend (Host's website) - `hosts/your-host-name/.env`**:
   
   Create or edit this file in the host's frontend folder. This file is safe to commit to git (it only contains the publishable key, which is designed to be public).
   
   ```env
   VITE_API_URL=http://localhost:3001/api
   VITE_LISTING_ID=unique-listing-id
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...  # ← Paste the PUBLISHABLE key here
   ```
   
   **Where to put:** `hosts/your-host-name/.env` (same folder as the host's frontend code)
   
   **What goes here:** The **Publishable key** (starts with `pk_test_` or `pk_live_`)
   
   **Note:** The `VITE_` prefix means these variables are exposed to the browser. Only put safe-to-expose keys here.

2. **Backend (Server) - `server/.env`**:
   
   Create or edit this file in the `server/` folder. **Never commit this file to git** - it contains secrets!
   
   **If using ONE shared Stripe account for all hosts:**
   
   ```env
   STRIPE_SECRET_KEY=sk_test_...          # ← Paste the SECRET key here
   STRIPE_WEBHOOK_SECRET=whsec_...        # ← Paste the webhook secret here (from Step 3)
   JWT_SECRET=your-secret-key-change-in-production
   FRONTEND_URL=http://localhost:5173
   ```
   
   **If each host has their OWN Stripe account (recommended for production):**
   
   For each host, add their Stripe keys with a unique identifier. The identifier should match what you'll use in Step 5 when creating the host.
   
   ```env
   # Default/fallback Stripe keys (optional, for backwards compatibility)
   STRIPE_SECRET_KEY=sk_test_default...
   STRIPE_WEBHOOK_SECRET=whsec_default...
   
   # Host 1's Stripe keys (use identifier like 'host1', 'hostname', etc.)
   STRIPE_SECRET_KEY_HOST1=sk_test_host1...
   STRIPE_WEBHOOK_SECRET_HOST1=whsec_host1...
   
   # Host 2's Stripe keys
   STRIPE_SECRET_KEY_HOST2=sk_test_host2...
   STRIPE_WEBHOOK_SECRET_HOST2=whsec_host2...
   
   # Host 3's Stripe keys (example with different naming)
   STRIPE_SECRET_KEY_MOUNTAIN_CABIN=sk_live_mountain...
   STRIPE_WEBHOOK_SECRET_MOUNTAIN_CABIN=whsec_mountain...
   
   # ... add more hosts as needed
   
   JWT_SECRET=your-secret-key-change-in-production
   FRONTEND_URL=http://localhost:5173
   ```
   
   **Naming convention:**
   - Use uppercase letters and underscores (e.g., `HOST1`, `MOUNTAIN_CABIN`, `BEACH_HOUSE`)
   - The identifier you use here must match the `stripeSecretKeyId` you'll set in Step 5
   - Choose identifiers that are easy to remember (e.g., the host's name or a shortened property name)
   
   **What goes here:**
   - **Secret key** (starts with `sk_test_` or `sk_live_`) - Used by the server to create checkout sessions
   - **Webhook secret** (starts with `whsec_`) - Used to verify webhook requests are actually from Stripe
   
   **Important:** 
   - Each host's Stripe secret key must be added to `server/.env` before they can accept payments
   - The webhook secret for each host must match the webhook endpoint you set up in their Stripe Dashboard
   - You can use `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` as defaults for hosts without a specific key ID

3. **Restart your servers** after adding environment variables:
   - The frontend needs to be rebuilt if running in production mode
   - The backend server needs to be restarted to pick up the new `.env` values

### Step 7: Deploy

1. **Build the host's site**:
   ```bash
   cd hosts/your-host-name
   npm run build
   ```

2. **Deploy frontend** to hosting (Vercel, Netlify, etc.)

3. **Deploy backend** (if separate) or keep shared backend

### Step 8: Hand Over to Host

1. **Send them login credentials**:
   - Email: `host@theirproperty.com`
   - Password: `[generated password]`
   - Login URL: `https://theirproperty.com/login` or `https://yourdomain.com/hosts/their-site/login`

2. **Provide instructions**:
   - How to log in
   - How to change their password (if implemented)
   - How to manage bookings/customers
   - How to block dates

## Quick Checklist

- [ ] Frontend folder created and customized
- [ ] Photos added to `public/photos/`
- [ ] Site config updated with property details
- [ ] Listing added to `server/store.js`
- [ ] Host credentials created in backend
- [ ] Stripe account set up and keys obtained
- [ ] Environment variables configured
- [ ] Site tested locally
- [ ] Site deployed
- [ ] Login credentials sent to host

## Notes

- Each host gets their own unique `hostId` automatically
- All their data (bookings, customers, blocked dates) is automatically scoped to their `hostId`
- They can only see/edit their own data
- The frontend is mostly static - all dynamic data comes from the shared backend API



