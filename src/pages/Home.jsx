import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, CreditCard, CalendarDays, Clock, CheckCircle2, Phone, Mail } from 'lucide-react'

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
      <Section id="about" eyebrow="About" title="Hi, I'm Cole — I build direct-booking sites for hosts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            I create clean, fast websites that help hosts keep more of each booking. You’ll get a branded site,
            a secure checkout, and a calendar that syncs with Airbnb. Start simple and scale later with a login to view guests and bookings.
          </p>
          <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
            <img src="/photos/cabin3.jpg" className="w-full h-64 object-cover" alt="Portfolio example" />
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
