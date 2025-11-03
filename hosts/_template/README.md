# Property Website Template

This is a template for creating a direct-booking website for a rental property.

## Quick Start

1. **Edit `src/site-config.js`** - This is the main configuration file where you customize:
   - Property name, tagline, location
   - Photos and gallery
   - Amenities, highlights, reviews
   - Contact information
   - Listing ID and pricing

2. **Add photos** to `public/photos/`:
   - `hero.jpg` - Main cover photo
   - `gallery-1.jpg`, `gallery-2.jpg`, etc. - Gallery photos

3. **Update listing ID** in `src/site-config.js` to match what's in `server/store.js`

4. **Install and run**:
   ```bash
   npm install
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## File Structure

```
hosts/_template/
├── src/
│   ├── site-config.js          # ← EDIT THIS FILE FIRST
│   ├── PropertySite.jsx        # Main site component
│   ├── components/
│   │   └── BookingWidget.jsx   # Booking calendar widget
│   ├── main.jsx                # Entry point
│   └── index.css               # Styles
├── public/
│   └── photos/                 # ← ADD YOUR PHOTOS HERE
│       ├── hero.jpg
│       ├── gallery-1.jpg
│       └── ...
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Configuration

All customization is done in `src/site-config.js`. The template will automatically:
- Use your photos from `public/photos/`
- Connect to the shared backend API
- Handle booking flows with Stripe
- Display your property information

## Notes

- The backend API should be running on `http://localhost:3001` (or update vite.config.js proxy)
- Make sure the listing ID in `site-config.js` matches the listing ID in `server/store.js`
- Photos should be optimized for web (recommended: 1200px width, WebP or JPG format)



