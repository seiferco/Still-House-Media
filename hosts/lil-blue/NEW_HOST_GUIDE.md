# New Host Onboarding Guide

This guide explains how to create a new property website using the `_template` folder.

## 1. Create the Host Folder
1.  Navigate to the `hosts/` directory.
2.  Copy the `_template` folder and paste it.
3.  Rename the copied folder to your property ID (e.g., `mountain-view-cabin`).
    *   *Tip: Use lowercase with hyphens.*

## 2. Configure the Website
1.  Open `hosts/your-property-id/src/site-config.js`.
2.  Update the **Brand** section (Name, Tagline, Logo Text).
3.  Update **Location** details.
4.  **Important**: Update the **Booking** section with the Hostex URL.
    *   Go to your Hostex Dashboard.
    *   Navigate to **Channels** -> **Direct Booking**.
    *   Copy the booking widget link.
    *   Paste it into `booking.hostexUrl`.

## 3. Add Photos
1.  Go to `hosts/your-property-id/public/photos/`.
2.  Delete the placeholder images.
3.  Add your high-quality property photos.
4.  Update the `photos` array in `site-config.js` to match your filenames.
    *   *Example*: `"/photos/living-room.jpg"`

## 4. Customize Content
1.  Update the **Description** in `site-config.js`.
2.  Update **Amenities**, **Highlights**, and **Check-in Details**.
3.  Add any real **Guest Reviews** you have.

## 5. Launch
1.  Your site is ready!
2.  The booking system now uses Hostex, so all reservations will sync automatically with your other channels (Airbnb, VRBO, etc.).
