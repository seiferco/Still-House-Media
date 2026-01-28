import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Calendar,
  Users,
  Link2,
  TrendingUp,
  DollarSign,
  Shield,
  Zap,
  MessageCircle,
  AlertTriangle,
  ThumbsUp,
  X,
  Lock,
  Download,
  Plus,
  Minus
} from "lucide-react";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

// --- Modals ---

function GlassModal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
            <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="p-0 max-h-[80vh] overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function LeadCaptureModal({ isOpen, onClose, type = "roi" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      // In a real app, you would send this to your backend
      console.log(`Lead captured (${type}):`, email);
    }, 1500);
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title={type === "roi" ? "Get Your Custom ROI Report" : "Unlock Feature Details"}>
      <div className="p-8">
        {status === "success" ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">Report Sent!</h4>
            <p className="text-gray-400 mb-6">Check your inbox for your detailed analysis.</p>
            <button onClick={onClose} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <p className="text-gray-300 text-lg mb-2">
                {type === "roi"
                  ? "Stop guessing. See exactly how much revenue you're losing to platform fees."
                  : "Enter your email to see how this feature transforms your business."}
              </p>
              <p className="text-sm text-gray-500">We'll send the detailed breakdown directly to you.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  placeholder="name@company.com"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {status === "loading" ? "Processing..." : (type === "roi" ? "Send Me The Report" : "Unlock Details")}
                {!status === "loading" && <ArrowRight size={20} />}
              </button>
            </form>
            <p className="text-xs text-gray-600 text-center mt-4">
              We respect your privacy. No spam, ever.
            </p>
          </>
        )}
      </div>
    </GlassModal>
  );
}

// --- Components ---

function HeroSection({ onOpenSignUp }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Mesh Gradients */}
      <div className="absolute top-0 right-0 bg-mesh-amber" />
      <div className="absolute bottom-0 left-0 bg-mesh-blue" />

      {/* Cinematic Background with Ken Burns Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#0f172a] z-10" />
        <img
          src="/home-hero.jpg"
          alt="Luxury vacation rental interior"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="relative z-20 text-center max-w-5xl px-6"
        style={{ opacity }}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-amber-400 text-sm font-medium tracking-wide">
          <Zap size={16} fill="currentColor" />
          <span>The Future of Vacation Rentals</span>
        </motion.div>

        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-tight">
          Own Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Empire.</span>
        </motion.h1>

        <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Stop paying 15% commissions. Build a direct booking engine that captures guests, data, and revenue—all in one place.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onOpenSignUp}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(251,191,36,0.3)] cursor-pointer"
          >
            Start Free Trial
          </button>
          <a
            href="#features"
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-medium text-lg rounded-full backdrop-blur-sm transition-all flex items-center gap-2 group cursor-pointer"
          >
            How It Works <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

function SocialProofTicker() {
  return (
    <div className="bg-[#0f172a] border-b border-white/5 py-10 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-transparent to-[#0f172a] z-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Trusted by elite hosts worldwide</p>
      </div>

      <div className="flex overflow-hidden">
        <motion.div
          className="flex gap-16 items-center px-6"
          animate={{ x: "-50%" }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {/* Duplicated list for infinite scroll */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-2xl font-serif text-white">LuxeStays</span>
              <span className="text-2xl font-sans font-bold text-white tracking-tighter">HAVEN</span>
              <span className="text-2xl font-mono text-white">TheCove</span>
              <span className="text-2xl font-serif italic text-white">VISTAS</span>
              <span className="text-2xl font-sans font-black text-white">NEST</span>
              <span className="text-2xl font-serif text-white">LuxeStays</span>
              <span className="text-2xl font-sans font-bold text-white tracking-tighter">HAVEN</span>
              <span className="text-2xl font-mono text-white">TheCove</span>
              <span className="text-2xl font-serif italic text-white">VISTAS</span>
              <span className="text-2xl font-sans font-black text-white">NEST</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function TheHook() {
  return (
    <section className="py-40 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-mesh-blue opacity-50" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wide mb-6">
            <AlertTriangle size={14} /> The Silent Profit Killer
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Stop Bleeding Revenue to <span className="text-red-400">Platform Fees.</span>
          </h2>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Platforms like Airbnb take up to 15% of every booking. You do the work, they take the profit. It's time to cut out the middleman and build a direct channel that <b>you own</b>.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="glass-panel p-6">
              <div className="text-3xl font-bold text-white mb-1">15%</div>
              <div className="text-sm text-gray-500">Average Commission Lost</div>
            </div>
            <div className="glass-panel p-6">
              <div className="text-3xl font-bold text-white mb-1">0%</div>
              <div className="text-sm text-gray-500">Guest Data Retention</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Main Visual - The Receipt/Proof */}
          <div className="relative z-20 transform hover:scale-[1.02] transition-transform duration-500">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-700 rounded-[2rem] blur opacity-20"></div>
            <img
              src="/social-proof/example02.png"
              alt="Avoid Platform Fees Proof"
              className="w-full rounded-[2rem] shadow-2xl border border-white/10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureShowcase({ onOpenFeature }) {
  const features = [
    {
      id: "engine",
      title: "Direct Booking Engine",
      subtitle: "Seamless Transactions",
      description: "A powerful, commission-free booking engine that integrates directly with Stripe. Accept payments instantly and securely without the platform tax.",
      image: "/demo-shot-1.png",
      stats: "0% Commission Fees",
      align: "left",
      details: (
        <div className="space-y-6">
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
            <img src="/demo-shot-1.png" className="w-full h-full object-cover" alt="Booking Engine" />
          </div>
          <h4 className="text-lg font-bold text-white">Why This Matters</h4>
          <ul className="space-y-3">
            <li className="flex gap-3 text-gray-300">
              <CheckCircle2 className="text-amber-400 shrink-0" />
              <span>Keep 100% of the revenue. No split fees, no service charges.</span>
            </li>
            <li className="flex gap-3 text-gray-300">
              <CheckCircle2 className="text-amber-400 shrink-0" />
              <span>Instant payout via Stripe. No waiting for check-in.</span>
            </li>
            <li className="flex gap-3 text-gray-300">
              <CheckCircle2 className="text-amber-400 shrink-0" />
              <span>Own the guest relationship from day one.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "portfolio",
      title: "Cinematic Portfolio",
      subtitle: "Visual Excellence",
      description: "Showcase your property with high-resolution galleries that rival luxury hotel sites. We highlight the details that make your stay unique.",
      image: "/photos/cabin2.jpg",
      stats: "40% Higher Conversion",
      align: "right",
      details: (
        <div className="space-y-6">
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
            <img src="/photos/cabin2.jpg" className="w-full h-full object-cover" alt="Portfolio" />
          </div>
          <h4 className="text-lg font-bold text-white">Visuals Sell Stays</h4>
          <ul className="space-y-3">
            <li className="flex gap-3 text-gray-300">
              <CheckCircle2 className="text-amber-400 shrink-0" />
              <span>Full-screen galleries that immerse the viewer.</span>
            </li>
            <li className="flex gap-3 text-gray-300">
              <CheckCircle2 className="text-amber-400 shrink-0" />
              <span>Mobile-optimized layout for booking on the go.</span>
            </li>
            <li className="flex gap-3 text-gray-300">
              <CheckCircle2 className="text-amber-400 shrink-0" />
              <span>Clean, modern aesthetic that builds immediate trust.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: "sync",
      title: "Smart Calendar Sync",
      subtitle: "Total Peace of Mind",
      description: "Automatically sync availability across Airbnb, VRBO, and your direct site. Never worry about double bookings again.",
      image: "/photos/cabin3.jpg",
      stats: "Real-time Sync",
      align: "left",
      details: (
        <div className="space-y-6">
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
            <img src="/photos/cabin3.jpg" className="w-full h-full object-cover" alt="Sync" />
          </div>
          <h4 className="text-lg font-bold text-white">Set It & Forget It</h4>
          <ul className="space-y-3">
            <li className="flex gap-3 text-gray-300">
              <CheckCircle2 className="text-amber-400 shrink-0" />
              <span>2-Way iCal synchronization with all major OTAs.</span>
            </li>
            <li className="flex gap-3 text-gray-300">
              <CheckCircle2 className="text-amber-400 shrink-0" />
              <span>Prevents double-bookings automatically.</span>
            </li>
            <li className="flex gap-3 text-gray-300">
              <CheckCircle2 className="text-amber-400 shrink-0" />
              <span>Manage one calendar, fill dates everywhere.</span>
            </li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {features.map((feature, index) => (
          <div key={index} className={`flex flex-col lg:flex-row items-center gap-16 ${feature.align === 'right' ? 'lg:flex-row-reverse' : ''}`}>

            <motion.div
              className="flex-1 space-y-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block text-amber-400 font-mono text-sm tracking-wider uppercase border-b border-amber-400/30 pb-1">
                {feature.subtitle}
              </div>
              <h3 className="text-4xl font-bold text-white">{feature.title}</h3>
              <p className="text-lg text-gray-400 leading-relaxed">{feature.description}</p>

              <div className="flex flex-wrap gap-4">
                <div className="inline-flex items-center gap-3 px-5 py-3 glass-panel rounded-full text-white/90">
                  <CheckCircle2 size={18} className="text-amber-400" />
                  <span className="font-medium">{feature.stats}</span>
                </div>
                <button
                  onClick={() => onOpenFeature(feature)}
                  className="px-5 py-3 border border-white/20 rounded-full text-white hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  Learn More <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            <motion.div
              className="flex-1 w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="relative group cursor-pointer"
                onClick={() => onOpenFeature(feature)}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-white/5 rounded-[2rem] blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative glass-panel p-2 overflow-hidden aspect-[4/3]">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover rounded-[1.5rem] transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-bold flex items-center gap-2 border border-white/30">
                      <Lock size={18} /> View Details
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        ))}
      </div>
    </section>
  );
}

function WallOfPain() {
  const testimonials = [
    {
      text: "I had a guest cancel because the service fee was $400. I moved them to direct booking and we both saved money.",
      author: "Superhost via Reddit",
      source: "r/Airbnb_hosts",
      metric: "$400 Saved"
    },
    {
      text: "Just looked at the breakdown. $1,200 for the stay, but $350 in 'service fees'? This is why I look for direct sites.",
      author: "@TravelSmart",
      source: "Twitter",
      metric: "Guest Feedback"
    },
    {
      text: "When the platform glitches, my direct site stays open and I get paid instantly via Stripe. I own my business now.",
      author: "Vacation Rental Hosts Group",
      source: "Facebook",
      metric: "Instant Pay"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 bg-mesh-amber opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">The "Wall of Pain"</h2>
          <p className="text-xl text-gray-400">Hosts everywhere are realizing the cost of dependency.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-8 border-t-4 border-t-red-500/50 hover:border-t-red-500 transition-colors group"
            >
              <div className="flex justify-between items-start mb-6">
                <MessageCircle className="text-gray-500 group-hover:text-white transition-colors" size={24} />
                <span className="text-xs font-mono text-red-400 bg-red-400/10 px-2 py-1 rounded">{item.metric}</span>
              </div>
              <p className="text-gray-300 text-lg italic mb-6 leading-relaxed">"{item.text}"</p>
              <div className="flex flex-col">
                <span className="font-bold text-white">{item.author}</span>
                <span className="text-sm text-gray-600">{item.source}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingPreview({ onOpenQuiz }) {
  return (
    <section id="pricing" className="py-32 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-mesh-blue opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-400">No hidden fees. No commissions. Just your business.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Starter Plan */}
          <div className="glass-panel p-10 flex flex-col items-start relative hover:border-white/20 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-2">The Launchpad</h3>
            <p className="text-gray-400 mb-6">Perfect for single property hosts ready to own their brand.</p>
            <div className="text-5xl font-bold text-white mb-8">$199<span className="text-lg text-gray-500 font-normal">/mo</span></div>

            <ul className="space-y-4 mb-10 flex-1">
              {['Custom Direct Booking Site', 'Stripe Integration (0% Fees)', 'Calendar Sync (Airbnb/Vrbo)', 'Hosting & Maintenance'].map((item, i) => (
                <li key={i} className="flex gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-amber-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={onOpenQuiz}
              className="w-full py-4 border border-white/20 rounded-xl text-white font-bold hover:bg-white/10 transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Scale Plan */}
          <div className="glass-panel p-10 flex flex-col items-start relative border-amber-500/30 shadow-[0_0_30px_rgba(251,191,36,0.1)]">
            <div className="absolute top-0 right-0 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-[2rem]">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">The Empire</h3>
            <p className="text-gray-400 mb-6">For property managers scaling their portfolio.</p>
            <div className="text-5xl font-bold text-white mb-8">Custom</div>

            <ul className="space-y-4 mb-10 flex-1">
              {['Multi-Unit Management', 'Advanced SEO Package', 'Priority Support', 'Email Marketing Setup', 'Owner Portal'].map((item, i) => (
                <li key={i} className="flex gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-amber-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={onOpenQuiz}
              className="w-full py-4 bg-amber-500 text-slate-900 rounded-xl font-bold hover:bg-amber-400 transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "Do I really keep 100% of the revenue?",
      a: "Yes. Unlike Airbnb which charges service fees to both you and the guest, Still House Media charges zero commissions. You only pay standard credit card processing fees (like Stripe) directly."
    },
    {
      q: "Does this replace Airbnb or work with it?",
      a: "It works alongside it! We use 2-way calendar synchronization to ensure your dates are blocked on Airbnb when you get a direct booking, and vice-versa. No double bookings."
    },
    {
      q: "Who processes the payments?",
      a: "We integrate your site directly with Stripe, the world standard for online payments. Funds go straight to your bank account—we never touch your money."
    },
    {
      q: "I'm not tech-savvy. Is this hard to manage?",
      a: "Not at all. We build the site for you. Once it's live, you get a simple dashboard to view bookings and block dates. If you can use a smartphone, you can run your direct booking business."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Common Questions</h2>
          <p className="text-gray-400">Everything you need to know about going direct.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={false}
              className={`glass-panel overflow-hidden transition-all duration-300 ${openIndex === i ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 text-left flex items-center justify-between gap-4"
              >
                <span className="font-bold text-white text-lg">{faq.q}</span>
                <span className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>
                  <Plus size={20} className="text-amber-500" />
                </span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 text-gray-300 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RevenueCalculator({ onOpenROI }) {
  const [revenue, setRevenue] = useState(75000);
  const platformFee = Math.round(revenue * 0.15); // 15% avg
  const monthlyCost = 199 * 12; // Example Still House cost
  const savings = platformFee - monthlyCost;

  return (
    <section id="roi" className="py-32 relative">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-mesh-amber opacity-20" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="glass-panel p-8 md:p-16 relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Calculate Your Potential</h2>
              <p className="text-gray-400 mb-10">See how much revenue you're leaking to platforms annually vs. owning your own site.</p>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-400 mb-2">
                    <span>Annual Booking Revenue</span>
                    <span className="text-white">${revenue.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="5000"
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>

                <div className="pt-8 border-t border-white/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Platform Fees (Est. 15%)</span>
                    <span className="text-red-400 font-mono">-${platformFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Still House Media (Yearly)</span>
                    <span className="text-white font-mono">-${monthlyCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0b1120] rounded-3xl p-8 border border-white/5 text-center relative">
              <div className="text-sm text-gray-500 uppercase tracking-widest mb-2">Annual Savings</div>
              <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-4">
                ${savings.toLocaleString()}
              </div>
              <p className="text-gray-400 text-sm">That's profit back in your pocket.</p>

              <button
                onClick={onOpenROI}
                className="mt-8 w-full py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl transition-all font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download size={18} />
                Get Your Custom ROI Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ onOpenSignUp }) {
  return (
    <section className="py-40 relative overflow-hidden flex items-center justify-center">
      {/* Blurred Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <img src="/home-hero.jpg" className="w-full h-full object-cover blur-md" alt="" />
      </div>

      <div className="relative z-20 text-center px-6 max-w-4xl">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
          Ready to Launch?
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Join the movement of hosts claiming their independence. Beautiful design, zero commissions, total control.
        </p>
        <button
          onClick={onOpenSignUp}
          className="px-12 py-5 bg-white text-black font-bold text-xl rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl cursor-pointer"
        >
          Start Building Now
        </button>
      </div>
    </section>
  );
}

export default function Home({ onOpenSignUp }) {
  const [activeFeature, setActiveFeature] = useState(null);
  const [isROIModalOpen, setIsROIModalOpen] = useState(false);

  return (
    <div className="bg-[#0f172a] min-h-screen selection:bg-amber-500 selection:text-black overflow-hidden">
      <HeroSection onOpenSignUp={onOpenSignUp} />
      <SocialProofTicker />
      <TheHook />
      <WallOfPain />
      <FeatureShowcase onOpenFeature={setActiveFeature} />
      <RevenueCalculator onOpenROI={() => setIsROIModalOpen(true)} />
      <PricingPreview onOpenQuiz={onOpenSignUp} />
      <FAQSection />
      <FinalCTA onOpenSignUp={onOpenSignUp} />

      {/* Feature Details Modal */}
      <GlassModal
        isOpen={!!activeFeature}
        onClose={() => setActiveFeature(null)}
        title={activeFeature?.title}
      >
        <div className="p-8">
          {activeFeature?.details}
          <div className="mt-8 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setActiveFeature(null);
                onOpenSignUp();
              }}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-lg transition-all"
            >
              I Want This Feature
            </button>
          </div>
        </div>
      </GlassModal>

      {/* ROI Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isROIModalOpen}
        onClose={() => setIsROIModalOpen(false)}
        type="roi"
      />
    </div>
  );
}






