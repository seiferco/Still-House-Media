import { motion } from 'framer-motion'
import { ShieldCheck, CreditCard, CalendarDays, Clock, CheckCircle2, Phone, Mail, TrendingUp, Users, DollarSign, Smartphone } from 'lucide-react'

const fade = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

function Section({ id, title, eyebrow, children }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <motion.div {...fade}>
        {eyebrow && <div className="text-sm font-medium tracking-widest uppercase text-zinc-500 dark:text-zinc-400 mb-2">{eyebrow}</div>}
        {title && <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">{title}</h2>}
        {children}
      </motion.div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 z-0" />
        <img src="/photos/home/home-hero.jpg" alt="Direct-booking websites for hosts" className="h-[100vh] w-full object-cover" />
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...fade} className="max-w-2xl">
              <span className="text-white/90 text-sm tracking-widest uppercase">Direct bookings, zero hassle</span>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mt-3">
                Stillhouse Media — beautiful, fast <span className="opacity-90">direct-booking sites</span> for Airbnb hosts
              </h1>
              <p className="text-white/90 mt-4 leading-relaxed">
                Keep more revenue, own your guest list, and sync calendars. Launch a branded site in days.
              </p>
              <div className="flex gap-3 mt-6">
                <a href="/demo-template" target="_blank" rel="noopener noreferrer" className="rounded-2xl px-5 py-3 bg-zinc-900 text-white hover:bg-zinc-800 transition">
                    View live demo
                </a>
                <a href="#contact" className="rounded-2xl px-5 py-3 bg-white/90 text-zinc-900 hover:bg-white transition">
                  Get a quote
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <Section id="benefits" eyebrow="Why direct booking" title="Everything you need to go off-platform">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: CreditCard, title: "Own your payments", text: "Stripe-powered checkout with your bank payouts." },
            { icon: CalendarDays, title: "Calendar sync", text: "Two-way iCal keeps Airbnb and your site aligned." },
            { icon: ShieldCheck, title: "Fraud-safe", text: "Payment holds, webhook checks, and dispute tooling." },
            { icon: Clock, title: "Fast launch", text: "Template to live in days, not weeks." },
            { icon: CheckCircle2, title: "Simple ops", text: "Email confirmations, policy pages, and receipts." },
            { icon: CreditCard, title: "Coupons & upsells", text: "Offer repeat-guest discounts and add-ons." }
          ].map((b, i) => (
            <div key={i} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-900 shadow-sm">
              <b.icon className="text-zinc-600 dark:text-zinc-300 mb-2" />
              <div className="font-medium mb-1">{b.title}</div>
              <p className="text-sm opacity-80">{b.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* About */}
      <Section id="about" eyebrow="What I Build" title="Direct-booking sites that turn your Airbnb property into a revenue machine">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Story & Value Prop */}
          <div className="space-y-6">
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Hi, I'm Cole — and I help hosts escape platform fees</h3>
              <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                While you're losing 15–20% to Airbnb on every booking, your guests are ready to book directly with you. 
                I build <strong className="text-zinc-900 dark:text-zinc-100">fast, beautiful websites</strong> that let you capture those direct bookings 
                and keep 100% of your revenue (minus Stripe's 2.9%).
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Every site includes a secure Stripe checkout, automatic calendar sync with Airbnb, customer management, 
                and everything else you need to run a professional direct-booking operation—no coding required on your end.
              </p>
            </div>

            {/* Stats/Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">~15%</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Extra Revenue</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">2.9%</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Processing Fee</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">&lt;1wk</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Launch Time</div>
              </div>
            </div>
          </div>

          {/* Right: Feature Grid */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">What Every Site Includes</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { 
                  icon: DollarSign, 
                  title: "Keep 100% of revenue", 
                  text: "No platform fees. Only Stripe's standard 2.9% processing fee—you keep everything else." 
                },
                { 
                  icon: Users, 
                  title: "Own your guest list", 
                  text: "Direct access to customer emails and phone numbers. Build repeat bookings and market to past guests." 
                },
                { 
                  icon: CalendarDays, 
                  title: "Automatic calendar sync", 
                  text: "Two-way iCal sync keeps Airbnb and your direct site perfectly aligned. No double bookings, ever." 
                },
                { 
                  icon: ShieldCheck, 
                  title: "Enterprise-grade security", 
                  text: "Stripe handles all payments. PCI compliant, fraud protection, and secure checkout included." 
                },
                { 
                  icon: Smartphone, 
                  title: "Mobile-optimized", 
                  text: "Your site looks perfect on every device. Guests can browse and book seamlessly from phones, tablets, or desktops." 
                },
                { 
                  icon: TrendingUp, 
                  title: "Host dashboard", 
                  text: "Login to view all bookings, manage customers, block dates, and track your direct booking revenue." 
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <feature.icon className="text-zinc-700 dark:text-zinc-300" size={20} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{feature.title}</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{feature.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Image & CTA */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-lg">
            <img src="/photos/cabin3.jpg" className="w-full h-80 object-cover" alt="Example direct-booking site" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white text-sm font-medium">Real site built for a host</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Ready to stop paying platform fees?</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Get a custom direct-booking site tailored to your property. Launch in days, not months. 
              No technical knowledge required—I handle everything from design to deployment.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition"
              >
                Get a quote
              </a>
              <a 
                href="/demo-template" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                View live demo
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section id="cta" eyebrow="See it in action">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-between gap-4 flex-col md:flex-row">
          <div>
            <h3 className="text-xl font-semibold">Ready to try the demo?</h3>
            <p className="opacity-80">Explore the booking flow, check availability, and test Stripe in sandbox mode.</p>
          </div>
          <a href="/demo-template" target="_blank" rel="noopener noreferrer">
            Open demo template
          </a>
        </div>
      </Section>

      {/* Contact (simple) */}
      <Section id="contact" title="Get a quote">
        <div className="md:col-span-2">
        </div>
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900 shadow-sm h-max">
          <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200"><Phone size={18}/> 541-294-3114 </div>
          <div className="flex items-center gap-2 mt-2 text-zinc-800 dark:text-zinc-200"><Mail size={18}/> stillhousemedia@outlook.com </div>
        </div>
    </Section>
    </>
  )
}
