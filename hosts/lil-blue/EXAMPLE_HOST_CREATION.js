/**
 * EXAMPLE: How to create a host in the backend
 * 
 * Copy this code and add it to server/index.js in the initialization section
 * (around line 442, after the default host creation)
 * 
 * IMPORTANT: Make sure you've already:
 * 1. Created the listing in server/store.js (LISTINGS array)
 * 2. Set up their Stripe account
 */

import bcrypt from 'bcryptjs';
import { findHostByEmail, createHost } from './server/store.js';

// Example: Creating "Mountain View Cabin" host
(async () => {
  const hostEmail = 'mountainview@example.com';           // Host's login email
  const hostPassword = 'SecurePassword123!';               // Generate a secure password
  const listingId = 'mountain-view-cabin';                 // Must match listing ID in store.js
  const websiteId = 'mountain-view-cabin';                 // Unique website identifier
  const sitePath = 'hosts/mountain-view-cabin';           // Path to their frontend folder
  const stripeAccountId = 'acct_xxxxx';                   // Their Stripe account ID (optional)

  // Check if host already exists
  if (!findHostByEmail(hostEmail)) {
    const passwordHash = await bcrypt.hash(hostPassword, 10);
    const host = createHost(
      hostEmail,
      passwordHash,
      [listingId],        // Array of listing IDs they manage
      websiteId,           // websiteId
      sitePath,           // sitePath
      stripeAccountId     // stripeAccountId (optional)
    );
    
    console.log(`✅ Host created successfully!`);
    console.log(`   Email: ${hostEmail}`);
    console.log(`   Password: ${hostPassword}`);
    console.log(`   Host ID: ${host.id}`);
    console.log(`   Website ID: ${websiteId}`);
    console.log(`   Listing ID: ${listingId}`);
    
    // ⚠️ IMPORTANT: Save these credentials securely and send to the host
  } else {
    console.log(`Host ${hostEmail} already exists`);
  }
})();

/**
 * STEP-BY-STEP CHECKLIST:
 * 
 * [ ] 1. Create listing in server/store.js:
 *        LISTINGS.push({
 *          id: 'mountain-view-cabin',
 *          title: 'Mountain View Cabin',
 *          timezone: 'America/Los_Angeles',
 *          nightlyPrice: 25000,  // $250.00
 *          cleaningFee: 9500     // $95.00
 *        })
 * 
 * [ ] 2. Copy template folder:
 *        cp -r hosts/_template hosts/mountain-view-cabin
 * 
 * [ ] 3. Edit hosts/mountain-view-cabin/src/site-config.js
 *        - Update property details
 *        - Set listing ID to match above
 *        - Add photos to public/photos/
 * 
 * [ ] 4. Run this script (or add to server initialization)
 * 
 * [ ] 5. Test login with created credentials
 * 
 * [ ] 6. Send credentials to host securely
 */



