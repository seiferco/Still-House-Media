import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  CreditCard,
  X
} from "lucide-react";

const fade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

function SocialProofCarousel() {
  const proofs = [
    { img: "/social-proof/social-proof01.png", link: "https://northlaketahoecleaning.com/airbnb-vs-vrbo-vs-direct-bookings/" },
    { img: "/social-proof/social-proof02.png", link: "https://bio.site/north_cascades_haven?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnDBZXLum80vuf7aeHg-wCuBG_RPR2uxloTy97Ja28PtWr79DnHw_Pt__XdKg_aem_90axaWI0JQVchExx9TNHIw" },
    { img: "/social-proof/social-proof03.png", link: "https://www.boredpanda.com/airbnb-screenshots-ridiculous-fees-checkout-rules/" },
    { img: "/social-proof/social-proof04.png", link: "https://www.onthesandvacations.com/blog/why-you-should-book-direct-instead-of-using-airbnb-or-vrbo" },
    { img: "/social-proof/social-proof05.png", link: "https://www.reddit.com/r/airbnb_hosts/comments/1pawf9r/guests_are_being_charged_way_more_than_my_actual/" },
    { img: "/social-proof/social-proof06.png", link: "https://www.boredpanda.com/airbnb-screenshots-ridiculous-fees-checkout-rules/" },
  ];

  return (
    <section className="py-20 bg-gray-50 border-b border-gray-200 overflow-hidden">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-[#2D3142] mb-4">See What Other Hosts Are Saying</h3>
        <p className="text-xl text-[#4F5D75] max-w-3xl mx-auto px-4">
          Real stories from hosts dealing with platform fees and policies
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-8 px-4"
            animate={{ x: "-50%" }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity
            }}
            style={{ width: "fit-content" }}
          >
            {/* Double the array for seamless loop */}
            {[...proofs, ...proofs].map((proof, i) => (
              <a
                key={i}
                href={proof.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[400px] bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer overflow-hidden group"
              >
                <img
                  src={proof.img}
                  alt="Host testimonial"
                  className="w-full h-auto object-contain"
                />
                <div className="p-4 bg-gray-50 text-center border-t border-gray-100 group-hover:bg-[#FFEEE8] transition-colors">
                  <span className="text-sm font-semibold text-gray-600 group-hover:text-[#FF6B35] flex items-center justify-center gap-2">
                    View Original Post <ArrowRight size={16} />
                  </span>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WallOfPain() {
  const posts = [
    {
      source: "reddit",
      icon: <MessageCircle size={18} className="text-[#FF4500]" />,
      author: "u/HostLife_101",
      community: "r/Airbnb_hosts",
      title: "Guest complained about service fee...",
      content: "I had a guest cancel because the service fee was $400. I moved them to direct booking and we both saved money. It's ridiculous that we lose bookings because of fees we don't even see.",
      engagement: "245 upvotes · 58 comments",
      link: "https://www.reddit.com/r/airbnb_hosts/comments/1pawf9r/guests_are_being_charged_way_more_than_my_actual/"
    },
    {
      source: "twitter",
      icon: <Users size={18} className="text-[#1DA1F2]" />,
      author: "@TravelSmart",
      handle: "Guest",
      content: "Just looked at the breakdown for my vacation rental. $1,200 for the stay, but $350 in 'service fees'? This is why I always look for a direct booking site first. #BookDirect",
      engagement: "1.2k likes · 400 retweets"
    },
    {
      source: "facebook",
      icon: <ThumbsUp size={18} className="text-[#4267B2]" />,
      author: "Vacation Rental Hosts Group",
      content: "Another payout delayed by 'technical glitches'. This is why you can't build your business on rented land. When the platform glitches, my direct site stays open and I get paid instantly via Stripe.",
      engagement: "89 likes · 34 comments"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-600 font-semibold text-sm mb-6">
            <AlertTriangle size={16} />
            The Problem
          </div>
          <h2 className="text-4xl font-bold text-[#2D3142] mb-4">
            Don't Let Platform Fees Kill Your Bookings
          </h2>
          <p className="text-xl text-[#4F5D75] max-w-3xl mx-auto">
            Guests are tired of fees. Hosts are tired of losing control. The solution is your own brand.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
            >
              {/* Header - Interactive if link exists */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {post.icon}
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">{post.author}</div>
                  <div className="text-xs text-gray-500">{post.community || post.handle}</div>
                </div>
              </div>

              {/* Content Section - Conditionally wrapped in link */}
              {post.link ? (
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group cursor-pointer"
                >
                  {post.image ? (
                    <div className="mb-4">
                      <img src={post.image} alt="Social proof" className="rounded-lg w-full border border-gray-100 group-hover:opacity-90 transition-opacity" />
                    </div>
                  ) : (
                    <>
                      {post.title && (
                        <div className="font-bold text-gray-800 mb-2 text-sm group-hover:text-[#FF6B35] transition-colors">
                          {post.title}
                        </div>
                      )}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 group-hover:text-gray-900 transition-colors">
                        "{post.content}"
                      </p>
                    </>
                  )}
                </a>
              ) : (
                <>
                  {post.image ? (
                    <div className="mb-4">
                      <img src={post.image} alt="Social proof" className="rounded-lg w-full border border-gray-100" />
                    </div>
                  ) : (
                    <>
                      {post.title && <div className="font-bold text-gray-800 mb-2 text-sm">{post.title}</div>}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">"{post.content}"</p>
                    </>
                  )}
                </>
              )}

              <div className="text-xs text-gray-400 font-medium pt-4 border-t border-gray-100">
                {post.engagement}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg font-medium text-gray-600 mb-2">Stop renting your business. Start owning it.</p>
          <div className="text-[#FF6B35] font-bold text-xl">Build your Direct Booking engine today.</div>
        </div>
      </div>
    </section>
  );
}

function RevenueCalculator() {
  const [revenue, setRevenue] = useState(50000);

  const hostFeeRate = 0.03; // 3% Standard Split-Fee Model
  const guestFeeRate = 0.14; // ~14% Guest Service Fee

  const hostLoss = Math.round(revenue * hostFeeRate);
  const guestFriction = Math.round(revenue * guestFeeRate);
  const totalLoss = hostLoss + guestFriction;

  return (
    <div className="bg-[#2D3142] rounded-3xl p-8 md:p-12 text-white shadow-2xl overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B35] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">The "Middleman Tax" Calculator</h3>
          <p className="text-gray-300">See how much you and your guests are really paying to platforms (Split-Fee Model).</p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-2">Annual Revenue: <span className="text-white font-bold text-lg">${revenue.toLocaleString()}</span></label>
            <input
              type="range"
              min="10000"
              max="200000"
              step="5000"
              value={revenue}
              onChange={(e) => setRevenue(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>$10k</span>
              <span>$200k+</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/10 rounded-xl p-4 border border-white/10">
              <div className="text-xs text-gray-400 mb-1">Host Fees (3%)</div>
              <div className="text-xl font-bold text-red-400">-${hostLoss.toLocaleString()}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/10">
              <div className="text-xs text-gray-400 mb-1">Guest Fees (~14%)</div>
              <div className="text-xl font-bold text-red-400">-${guestFriction.toLocaleString()}</div>
            </div>
          </div>

          <div className="bg-white text-[#2D3142] rounded-xl p-6 text-center shadow-lg">
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Platform Cost</div>
            <div className="text-4xl font-black text-[#FF6B35] mb-2">${totalLoss.toLocaleString()}</div>
            <p className="text-sm text-gray-600">
              Money leaving your ecosystem every year.
            </p>
            <div className="mt-4 text-sm font-bold text-[#2D3142]">
              A Still House Media website starts at just $199/mo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home({ onOpenSignUp }) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FAFBFC] via-white to-[#FFEEE8] pt-20 pb-32">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B35] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5FA8A3] opacity-5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div {...fade} className="text-left">
              <div className="inline-block px-4 py-2 bg-[#FFEEE8] text-[#FF6B35] font-semibold text-sm rounded-full mb-6">
                ✨ Stop Paying 15% Commission Fees
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-['Space_Grotesk'] font-bold text-[#2D3142] leading-tight mb-6">
                Your Direct Booking Website.<br />
                <span className="text-[#FF6B35]">Avoid Fees.</span>
              </h1>
              <p className="text-xl text-[#4F5D75] leading-relaxed mb-8 max-w-2xl">
                Empower your vacation rental with a custom website that bypasses Airbnb fees
                and puts you in control. Keep 100% of your revenue.
              </p>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-6 mb-10 text-[#4F5D75]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-[#5FA8A3]" />
                  <span>Erase service fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-[#5FA8A3]" />
                  <span>Keep 100% revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-[#5FA8A3]" />
                  <span>Own your guest data</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onOpenSignUp}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6B35] text-white font-semibold rounded-lg hover:bg-[#E85D2A] active:scale-95 transition-all shadow-lg hover:shadow-xl text-lg cursor-pointer"
                >
                  Start Free Trial
                  <ArrowRight size={20} />
                </button>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#FF6B35] font-semibold rounded-lg border-2 border-[#FF6B35] hover:bg-[#FFEEE8] transition-all text-lg"
                >
                  See How It Works
                </a>
              </div>
            </motion.div>

            {/* Right: Visual/Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="space-y-6">
                  {/* Mock Website Preview */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-4 bg-gray-100 rounded-md px-4 py-2 text-xs text-gray-500">
                      www.coralbreezeestate.com/
                    </div>
                  </div>

                  <div className="h-70 bg-gradient-to-br from-[#5FA8A3] to-[#FF6B35] rounded-lg flex items-center justify-center text-white">
                    <div className="text-center">
                      <img src="/social-proof/example01.png" alt="Hero proof 1" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                    </div>
                    <div className="text-center">
                      <img src="/social-proof/example03.png" alt="Hero proof 3" />
                    </div>
                    <div className="text-center">
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#2D3142]">$2,500</div>
                    <div className="text-xs text-gray-500">Avg. Monthly Savings</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wall of Pain Section */}
      <WallOfPain />

      {/* Social Proof Carousel */}
      <SocialProofCarousel />

      {/* Problem/Solution Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2D3142] mb-4">
              Stop Losing Money to Booking Platforms
            </h2>
            <p className="text-xl text-[#4F5D75] max-w-3xl mx-auto">
              Airbnb, Vrbo, and Booking.com charge up to 15% in commission fees.
              That's thousands of dollars leaving your pocket every month.
            </p>
          </div>

          {/* Insert Calculator Here */}
          <div className="mb-20 max-w-4xl mx-auto">
            <RevenueCalculator />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
              <div className="text-red-600 font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">❌</span> With Booking Platforms
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Lose 15% of every booking to commissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>No access to guest contact information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Compete with hundreds of similar listings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Platform controls your cancellation policy</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-white rounded-lg border border-red-300">
                <div className="text-sm text-gray-600 mb-1">Sample Booking</div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Revenue:</span>
                  <span className="font-bold text-gray-900">$2,000</span>
                </div>
                <div className="flex justify-between items-center text-red-600">
                  <span>Platform Fees (15%):</span>
                  <span className="font-bold">-$300</span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                  <span className="text-gray-700">You Keep:</span>
                  <span className="text-2xl font-bold text-gray-900">$1,700</span>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="bg-green-50 border-2 border-green-400 rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#FF6B35] text-white px-4 py-1 rounded-full text-sm font-semibold">
                Recommended
              </div>
              <div className="text-green-600 font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">✓</span> With Still House Media
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Keep 100% of every booking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Own your complete guest contact list</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Your own branded, professional website</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Full control over policies and terms</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-white rounded-lg border-2 border-green-400">
                <div className="text-sm text-gray-600 mb-1">Sample Booking</div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Revenue:</span>
                  <span className="font-bold text-gray-900">$2,000</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span>Platform Fees:</span>
                  <span className="font-bold">$0</span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                  <span className="text-gray-700">You Keep:</span>
                  <span className="text-2xl font-bold text-green-600">$2,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-2xl font-bold text-[#2D3142]">
              That's <span className="text-[#FF6B35]">$300 saved</span> per booking!
            </p>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="features" className="py-20 bg-gradient-to-b from-[#FAFBFC] to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2D3142] mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-[#4F5D75] max-w-3xl mx-auto">
              Professional tools to manage your vacation rental business like a pro
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-[#FFEEE8] rounded-xl flex items-center justify-center mb-6">
                <Globe size={28} className="text-[#FF6B35]" />
              </div>
              <h3 className="text-xl font-bold text-[#2D3142] mb-3">Custom Direct-Booking Website</h3>
              <p className="text-gray-600 leading-relaxed">
                Professional website built for your property in minutes. No coding required.
                Fully customizable to match your brand.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-[#E8F5F1] rounded-xl flex items-center justify-center mb-6">
                <Calendar size={28} className="text-[#5FA8A3]" />
              </div>
              <h3 className="text-xl font-bold text-[#2D3142] mb-3">Smart Calendar Sync</h3>
              <p className="text-gray-600 leading-relaxed">
                Automatic synchronization across Airbnb, Vrbo, and your direct site prevents
                double-bookings without the headache.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-[#FFF4E6] rounded-xl flex items-center justify-center mb-6">
                <Users size={28} className="text-[#FF9500]" />
              </div>
              <h3 className="text-xl font-bold text-[#2D3142] mb-3">Guest Data Ownership</h3>
              <p className="text-gray-600 leading-relaxed">
                Capture real guest emails and build your customer list. Drive repeat bookings
                and reduce dependence on platforms.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-[#E8F0FE] rounded-xl flex items-center justify-center mb-6">
                <Link2 size={28} className="text-[#4285F4]" />
              </div>
              <h3 className="text-xl font-bold text-[#2D3142] mb-3">Hostex Integration</h3>
              <p className="text-gray-600 leading-relaxed">
                Seamless payment processing and booking management through professional-grade
                Hostex integration.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2D3142] mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-xl text-[#4F5D75] max-w-3xl mx-auto">
              Launch your direct booking website in under 24 hours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#E85D2A] rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                    1
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#2D3142] mb-4">Create Your Account</h3>
              <p className="text-gray-600 leading-relaxed">
                Sign up in under 2 minutes. No credit card required to get started.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#5FA8A3] to-[#4A8A85] rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                    2
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#2D3142] mb-4">Customize Your Site</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose your design, add photos, and customize your branding in minutes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#FF9500] to-[#E88600] rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                    3
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#2D3142] mb-4">Start Taking Bookings</h3>
              <p className="text-gray-600 leading-relaxed">
                Share your link and start keeping 100% of your booking revenue immediately.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF6B35] text-white font-semibold rounded-lg hover:bg-[#E85D2A] transition-all shadow-lg text-lg"
            >
              Get Started Now
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-[#FAFBFC] to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2D3142] mb-4">
              Professional Direct Booking Package
            </h2>
            <p className="text-xl text-[#4F5D75] max-w-3xl mx-auto">
              Everything you need to succeed with direct bookings
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#FF6B35] p-10 md:p-12 relative overflow-hidden">
              <div className="absolute top-6 right-0 bg-[#FF6B35] text-white py-1 px-8 rotate-45 translate-x-8 font-bold text-sm shadow-md">
                POPULAR
              </div>

              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                  Starting at $199
                </div>
                <h3 className="text-3xl font-bold text-[#2D3142] mb-2">Complete Build Package</h3>
                <p className="text-gray-600">Launch your direct booking business with confidence</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Left: Features */}
                <div>
                  <h4 className="font-bold text-[#2D3142] mb-4 text-lg">What's Included:</h4>
                  <ul className="space-y-3">
                    {[
                      "Custom-designed property website",
                      "Hostex booking engine integration",
                      "Calendar sync setup (Airbnb, Vrbo, Booking.com)",
                      "Professional property photography integration",
                      "SEO optimization",
                      "Guest data capture & CRM",
                      "Mobile-responsive design",
                      "Dedicated onboarding support"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-[#5FA8A3] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Benefits */}
                <div>
                  <h4 className="font-bold text-[#2D3142] mb-4 text-lg">Your Benefits:</h4>
                  <ul className="space-y-3">
                    {[
                      { icon: DollarSign, text: "Save thousands in commission fees" },
                      { icon: Users, text: "Build your own guest database" },
                      { icon: Shield, text: "Full control over your business" },
                      { icon: TrendingUp, text: "Increase repeat bookings" },
                      { icon: Zap, text: "Launch in under 1 week" }
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#FFEEE8] rounded-lg flex items-center justify-center flex-shrink-0">
                          <benefit.icon size={16} className="text-[#FF6B35]" />
                        </div>
                        <span className="text-gray-700 leading-relaxed">{benefit.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-center pt-8 border-t border-gray-200">
                <button
                  onClick={onOpenSignUp}
                  className="inline-flex items-center gap-2 px-10 py-5 bg-[#FF6B35] text-white font-bold rounded-lg hover:bg-[#E85D2A] transition-all shadow-lg hover:shadow-xl text-xl cursor-pointer"
                >
                  Get Your Custom Quote
                  <ArrowRight size={24} />
                </button>
                <p className="text-sm text-gray-500 mt-4">No long-term contracts • Cancel anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof/Stats */}
      <section className="py-20 bg-[#2D3142] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold text-[#FF6B35] mb-2">500+</div>
              <div className="text-xl text-gray-300">Vacation Rental Hosts</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#5FA8A3] mb-2">$2.5M+</div>
              <div className="text-xl text-gray-300">Saved in Commission Fees</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#FF9500] mb-2">15%</div>
              <div className="text-xl text-gray-300">Average Commission Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[#FF6B35] to-[#E85D2A] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Take Control of Your Vacation Rental Business?
          </h2>
          <p className="text-xl mb-10 text-white/90">
            Join hundreds of hosts who are keeping 100% of their revenue with Still House Media
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onOpenSignUp}
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-[#FF6B35] font-bold rounded-lg hover:bg-gray-100 transition-all shadow-xl text-xl cursor-pointer"
            >
              Get Started Today
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
