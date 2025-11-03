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
2. **Get their Stripe keys**:
   - Stripe Dashboard → Developers → API keys
   - Copy the **Publishable key** and **Secret key**
3. **Set up webhook** (optional but recommended):
   - Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/stripe-webhook`
   - Select event: `checkout.session.completed`
   - Copy webhook secret

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
  
  if (!findHostByEmail(hostEmail)) {
    const passwordHash = await bcrypt.hash(hostPassword, 10);
    createHost(
      hostEmail,
      passwordHash,
      [listingId],                    // Array of listing IDs they manage
      listingId,                     // websiteId (usually same as listing)
      'hosts/your-host-name',        // Path to their frontend folder
      'acct_stripe_account_id'       // Their Stripe account ID (optional)
    );
    console.log(`Host created: ${hostEmail} / ${hostPassword}`);
  }
})();
```

### Step 6: Configure Environment Variables

1. **Create/Update `hosts/your-host-name/.env`**:
   ```env
   VITE_API_URL=http://localhost:3001/api
   VITE_LISTING_ID=unique-listing-id
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

2. **Update `server/.env`** (if using different Stripe accounts):
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

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



