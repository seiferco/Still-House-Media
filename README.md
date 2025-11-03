# Stillhouse Media — Direct Booking Platform for Vacation Rentals

A white-label vacation rental platform that empowers Airbnb hosts to launch their own branded direct-booking websites. Hosts keep 100% of revenue (minus Stripe processing fees), own their guest data, and manage everything through a centralized dashboard.

## 🎯 What We Do

Stillhouse Media provides turnkey direct-booking solutions for vacation rental hosts. Each host gets:

- **Their own branded website** - Customized property site with beautiful design
- **Zero platform fees** - Only pay Stripe's 2.9% processing fee
- **Complete guest ownership** - Direct access to customer emails and phone numbers
- **Host dashboard** - Manage bookings, customers, and blocked dates
- **Payment processing** - Secure Stripe integration for seamless transactions
- **Calendar management** - Block dates and prevent double bookings

## ✨ Key Features

### For Hosts

- 🎨 **Custom Branded Websites** - Each property gets a fully customizable React-based site
- 💰 **Keep 100% Revenue** - No platform commissions, only standard payment processing fees
- 📧 **Own Your Guest List** - Direct access to customer contact information
- 📅 **Calendar Sync** - Block dates and manage availability
- 📊 **Dashboard Analytics** - View all bookings, customers, and revenue
- 🔐 **Secure Payments** - Enterprise-grade Stripe integration with PCI compliance

### For Guests

- 📱 **Mobile-Optimized** - Beautiful, responsive design that works on all devices
- ⚡ **Fast Booking** - Streamlined checkout process
- 🔒 **Secure Payments** - Stripe-powered payment processing
- 📸 **Rich Media** - High-quality photo galleries and property showcases

## 🏗️ Architecture

This is a **multi-tenant platform** where each host has:

1. **Frontend Website** (`hosts/{host-name}/`) - Individual React + Vite site per property
2. **Shared Backend API** (`server/`) - Express.js server managing all hosts
3. **Host Dashboard** - Secure login portal for managing bookings
4. **Stripe Integration** - Payment processing and webhook handling

### Tech Stack

**Frontend:**

- React 19
- Vite 7
- Tailwind CSS 4
- Framer Motion (animations)
- Lucide React (icons)

**Backend:**

- Express.js 5
- Node.js (ESM)
- JWT authentication
- bcryptjs (password hashing)
- Stripe SDK

**Key Libraries:**

- `react-router-dom` - Routing
- `cookie-parser` - Session management
- `cors` - Cross-origin resource sharing

## 📁 Project Structure

```text
airbnb-demo-withStripe/
├── hosts/                    # Individual host websites
│   ├── _template/            # Template for new hosts
│   ├── host1/                # Example host site
│   │   ├── src/
│   │   │   └── site-config.js    # Property configuration
│   │   ├── public/
│   │   │   └── photos/           # Property images
│   │   └── package.json
│   └── ...
├── server/                   # Shared backend API
│   ├── index.js              # Express server & routes
│   ├── store.js              # In-memory data store
│   └── .env                  # Server environment variables
├── src/                      # Main application
│   ├── pages/
│   │   ├── Home.jsx          # Marketing homepage
│   │   └── Dashboard.jsx     # Host dashboard
│   └── VacationRentalTemplate.jsx  # Property template
├── public/                   # Shared assets
└── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Stripe account (for payment processing)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd airbnb-demo-withStripe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create `server/.env`:

   ```env
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   JWT_SECRET=your-secret-key-change-in-production
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start development servers**

   ```bash
   npm run dev
   ```

   This runs both:

   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3001`

## 🏡 Adding a New Host/Property

See our detailed **[Onboarding Guide](./ONBOARDING_GUIDE.md)** for step-by-step instructions.

**Quick summary:**

1. Create host folder: `hosts/new-host-name/`
2. Copy template: `cp -r hosts/_template/* hosts/new-host-name/`
3. Customize `site-config.js` with property details
4. Add property photos to `public/photos/`
5. Create listing in `server/store.js`
6. Create host account in backend
7. Configure Stripe keys
8. Deploy!

## 🎨 Customization

Each host site is fully customizable through `src/site-config.js`:

- Brand colors and logo
- Property name, location, description
- Photo gallery
- Amenities and highlights
- Reviews and testimonials
- Contact information
- Pricing (nightly rate + cleaning fee)

## 🔐 Security

- JWT-based authentication for host dashboard
- bcrypt password hashing
- Secure cookie sessions
- Stripe webhook signature verification
- CORS protection
- Host-scoped data isolation (each host only sees their own bookings)

## 📊 Dashboard Features

Hosts can access their dashboard at `/login` to:

- ✅ View all bookings with customer details
- 👥 Manage customer database
- 📅 Block/unblock dates on calendar
- 💳 See payment information
- 📧 Access guest contact information

## 🔌 API Endpoints

### Public Endpoints

- `GET /api/health` - Health check
- `GET /api/listings/:id` - Get listing details
- `GET /api/listings/:id/availability` - Check availability
- `POST /api/create-hold` - Reserve dates temporarily
- `POST /api/create-checkout` - Create Stripe checkout session

### Protected Endpoints (Host Dashboard)

- `POST /api/login` - Host authentication
- `GET /api/me` - Get current host info
- `GET /api/dashboard/bookings` - Get host's bookings
- `GET /api/dashboard/customers` - Get host's customers
- `GET /api/dashboard/blocked-dates` - Get blocked dates
- `POST /api/dashboard/block-dates` - Block dates
- `DELETE /api/dashboard/block-dates/:id` - Unblock dates

## 💳 Stripe Integration

The platform uses Stripe for payment processing:

- **Checkout Sessions** - Secure payment collection
- **Webhooks** - Confirm bookings after successful payment
- **Multi-account Support** - Each host can use their own Stripe account (optional)

## 🌐 Deployment

### Frontend (Vite)

```bash
cd hosts/host-name
npm run build
# Deploy dist/ folder to Vercel, Netlify, etc.
```

### Backend (Express)

Deploy `server/` to:

- Heroku
- Railway
- DigitalOcean
- AWS EC2
- Any Node.js hosting service

## 📝 Environment Variables

### Server (`server/.env`)

```env
STRIPE_SECRET_KEY=sk_live_... or sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... (optional)
JWT_SECRET=change-this-to-random-string
FRONTEND_URL=https://yourdomain.com
```

### Host Sites (`hosts/host-name/.env`)

```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_LISTING_ID=unique-listing-id
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_... or pk_test_...
```

## 🤝 Contributing

This is a proprietary platform, but suggestions and feedback are welcome!

## 📄 License

Proprietary - All rights reserved

## 📞 Support

For setup help, see the [Onboarding Guide](./ONBOARDING_GUIDE.md).

For questions or support, contact your Stillhouse Media representative.

---

Built with ❤️ for vacation rental hosts who want to take control of their bookings
