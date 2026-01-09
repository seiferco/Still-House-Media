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
  Zap
} from "lucide-react";

const fade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Home() {
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
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6B35] text-white font-semibold rounded-lg hover:bg-[#E85D2A] active:scale-95 transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Start Free Trial
                  <ArrowRight size={20} />
                </a>
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
                      yourvacationrental.com
                    </div>
                  </div>

                  <div className="h-64 bg-gradient-to-br from-[#5FA8A3] to-[#FF6B35] rounded-lg flex items-center justify-center text-white">
                    <div className="text-center">
                      <Globe size={48} className="mx-auto mb-4" />
                      <p className="text-lg font-semibold">Your Custom Website</p>
                      <p className="text-sm opacity-90">Professional • Mobile-Ready • SEO-Optimized</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-100 rounded h-20" />
                    <div className="bg-gray-100 rounded h-20" />
                    <div className="bg-gray-100 rounded h-20" />
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
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#FF6B35] p-10 md:p-12">
              <div className="text-center mb-10">
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
                      { icon: Zap, text: "Launch in under 24 hours" }
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
                <a
                  href="mailto:stillhousemedia@outlook.com"
                  className="inline-flex items-center gap-2 px-10 py-5 bg-[#FF6B35] text-white font-bold rounded-lg hover:bg-[#E85D2A] transition-all shadow-lg hover:shadow-xl text-xl"
                >
                  Get Your Custom Quote
                  <ArrowRight size={24} />
                </a>
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
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-[#FF6B35] font-bold rounded-lg hover:bg-gray-100 transition-all shadow-xl text-xl"
            >
              Get Started Today
              <ArrowRight size={24} />
            </a>
            <a
              href="mailto:hello@stillhousemedia.com"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all text-xl"
            >
              Schedule a Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
