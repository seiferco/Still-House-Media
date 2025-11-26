import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { 
  ShieldCheck, CreditCard, CalendarDays, Clock, CheckCircle2, Phone, Mail, 
  TrendingUp, Users, DollarSign, Smartphone, ArrowRight, Sparkles, Quote, 
  ChevronDown, Star, Zap, Award, Globe
} from 'lucide-react'

const fadeIn = { 
  initial: { opacity: 0, y: 20 }, 
  animate: { opacity: 1, y: 0 }, 
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } 
}

const stagger = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`section-padding ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null)

  const stats = [
    { icon: TrendingUp, value: '~18%', label: 'Average revenue lift' },
    { icon: DollarSign, value: '2.9%', label: 'Processing fee only' },
    { icon: Clock, value: '<7 days', label: 'Launch time' }
  ]

  const features = [
    {
      icon: ShieldCheck,
      title: 'Bank-level security',
      description: 'Stripe-powered checkout with PCI compliance, fraud protection, and secure payment processing.'
    },
    {
      icon: CreditCard,
      title: 'Keep 100% revenue',
      description: 'No platform fees. Only Stripe\'s standard 2.9% processing fee—you keep everything else.'
    },
    {
      icon: CalendarDays,
      title: 'Automatic calendar sync',
      description: 'Two-way iCal sync keeps Airbnb and your direct site perfectly aligned. No double bookings.'
    },
    {
      icon: Users,
      title: 'Own your guest list',
      description: 'Direct access to customer emails and phone numbers. Build repeat bookings and market to past guests.'
    },
    {
      icon: Smartphone,
      title: 'Mobile-optimized',
      description: 'Your site looks perfect on every device. Guests can browse and book seamlessly from any screen.'
    },
    {
      icon: Zap,
      title: 'Fast launch',
      description: 'Template to live in days, not weeks. No technical knowledge required on your end.'
    }
  ]

  const testimonials = [
    {
      quote: 'Our calendar filled in half the time, and guests keep remarking on how polished the site feels.',
      author: 'Kelsey & Mark',
      property: 'Pacific Dune Getaway',
      rating: 5
    },
    {
      quote: 'Stripe deposits hit within days and the direct booking flow feels more premium than Airbnb.',
      author: 'Maya L.',
      property: 'Desert Ridge Villa',
      rating: 5
    },
    {
      quote: 'Cole translated our brand into a booking experience that drives trust and repeat visits.',
      author: 'James C.',
      property: 'Skyline Loft Retreat',
      rating: 5
    }
  ]

  const faqs = [
    {
      question: 'How fast can we launch my direct-booking site?',
      answer: 'Most properties go from kickoff to live launch in 5–7 business days, including copy refinements, Stripe integration, and calendar sync.'
    },
    {
      question: 'Do you handle all the tech setup?',
      answer: 'Yes. We set up hosting, connect Stripe, configure your domain, embed calendars, and give you a clear playbook to manage the site going forward.'
    },
    {
      question: 'Can the design be tailored to my brand?',
      answer: 'Absolutely. Typography, color story, photography, and copy are tuned to your property so the experience feels bespoke and premium.'
    },
    {
      question: 'What happens after launch?',
      answer: 'You get a concierge-level handoff, loom walkthroughs, and a dedicated support window to ensure every part of the booking flow performs.'
    },
    {
      question: 'How do I manage bookings and availability?',
      answer: 'You\'ll have access to a simple dashboard where you can view all bookings, manage customers, block dates, and track your direct booking revenue. Calendar sync happens automatically.'
    }
  ]

  const packageFeatures = [
    'Custom high-converting landing page',
    'Stripe checkout with upsells & coupons',
    'Automated confirmations & policy pages',
    'Property-specific SEO foundation',
    'Two-way iCal calendar sync',
    'Host dashboard for booking management',
    'Mobile-optimized responsive design',
    'Training library + 30-day concierge support'
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/photos/home/home-hero.jpg" 
            alt="Luxury vacation rental" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        
        <div className="relative z-10 w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <Motion.div 
              {...fadeIn}
              className="max-w-4xl mx-auto text-center"
            >
              <Motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 badge mb-6"
              >
                <Sparkles size={14} />
                <span>Direct bookings refined</span>
              </Motion.div>
              
              <h1 className="text-display text-white mb-6">
                Build a high-converting direct-booking site that feels as{' '}
                <span className="text-gradient" style={{ WebkitTextFillColor: 'white' }}>
                  exquisite
                </span>{' '}
                as your property
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                Stillhouse Media crafts mid-century inspired, conversion-focused landing pages that elevate your brand, 
                capture more direct revenue, and keep payments in your pocket.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <a href="#packages" className="btn-primary">
                  View packages
                  <ArrowRight size={20} />
                </a>
                <a href="/demo-template" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  View live demo
                </a>
              </div>
              
              {/* Stats */}
              <Motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
              >
                {stats.map((stat, idx) => (
                  <div 
                    key={idx}
                    className="card-soft text-center"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <stat.icon className="mx-auto mb-3" size={24} style={{ color: 'var(--color-accent)' }} />
                    <div className="text-3xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                      {stat.value}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </Motion.div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <Section id="benefits" className="bg-white">
        <Motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{ ...stagger }}
        >
          <div className="text-center mb-16">
            <div className="badge mb-4">Why direct booking</div>
            <h2 className="text-headline mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Everything you need to go off-platform
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Stop losing 15–20% to platform fees. Own your guest relationships and keep more revenue.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Motion.div
                key={idx}
                variants={stagger}
                transition={{ delay: idx * 0.1 }}
                className="card group"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ 
                    backgroundColor: 'rgba(13, 148, 136, 0.1)',
                    color: 'var(--color-accent)'
                  }}
                >
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {feature.description}
                </p>
              </Motion.div>
            ))}
          </div>
        </Motion.div>
      </Section>

      {/* Social Proof / Testimonials */}
      <Section id="testimonials" className="bg-[var(--color-surface-soft)]">
        <Motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <div className="badge mb-4">Trusted by hosts</div>
            <h2 className="text-headline mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Hospitality brands that went direct—and never looked back
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Hosts across coastal retreats, desert escapes, and urban lofts use Stillhouse Media to present 
              their property with poise—and keep guests booking directly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-elevated relative"
              >
                <div 
                  className="absolute -top-4 left-6 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: 'var(--color-accent)',
                    color: 'white'
                  }}
                >
                  <Quote size={20} />
                </div>
                <div className="flex gap-1 mb-4 mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--color-gold)" color="var(--color-gold)" />
                  ))}
                </div>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                    {testimonial.author}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {testimonial.property}
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </Motion.div>
      </Section>

      {/* Package Cards Section - SaaS Style */}
      <Section id="packages" className="bg-white">
        <Motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <div className="badge mb-4">Signature engagement</div>
            <h2 className="text-headline mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Launch your direct-booking presence in a single engagement
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              You'll leave with a brand-caliber website, refined messaging, bulletproof payment flows, 
              and the confidence to scale bookings on your terms.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <Motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="package-card featured"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="badge mb-2">Most Popular</div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                      Complete Build
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      Everything you need to launch
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                      $2,800
                    </span>
                    <span className="text-lg" style={{ color: 'var(--color-text-muted)' }}>
                      one-time
                    </span>
                  </div>
                  <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>
                    Launch in 7 days • Optional retainers available
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {packageFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 
                        size={20} 
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: 'var(--color-accent)' }}
                      />
                      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="#contact" 
                  className="btn-primary w-full justify-center"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Book a discovery call
                  <ArrowRight size={20} />
                </a>
                
                <p className="text-xs text-center mt-4" style={{ color: 'var(--color-text-muted)' }}>
                  Custom proposal within 24 hours
                </p>
              </Motion.div>
            </div>
          </div>
        </Motion.div>
      </Section>

      {/* FAQ Section */}
      <Section id="faq" className="bg-[var(--color-surface-soft)]">
        <Motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <div className="badge mb-4">Answering the essentials</div>
            <h2 className="text-headline mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Frequently asked questions
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx
              return (
                <Motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="card"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 text-left"
                  >
                    <span className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      style={{ color: 'var(--color-accent)' }}
                    />
                  </button>
                  {isOpen && (
                    <Motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 text-sm leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {faq.answer}
                    </Motion.p>
                  )}
                </Motion.div>
              )
            })}
          </div>
        </Motion.div>
      </Section>

      {/* Final CTA Section */}
      <Section id="contact" className="bg-white">
        <Motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="card-elevated text-center">
            <div className="badge mb-4">Let's elevate your direct bookings</div>
            <h2 className="text-headline mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Ready to craft a boutique-grade direct-booking site?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Share a link to your listing, and we'll design a strategy-forward, Stripe-powered site 
              that feels like a 5-star stay.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <a
                href="tel:15412943114"
                className="card group hover:scale-105 transition-transform"
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto"
                  style={{ 
                    backgroundColor: 'rgba(13, 148, 136, 0.1)',
                    color: 'var(--color-accent)'
                  }}
                >
                  <Phone size={24} />
                </div>
                <div className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  Phone
                </div>
                <div className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  541-294-3114
                </div>
              </a>
              
              <a
                href="mailto:stillhousemedia@outlook.com"
                className="card group hover:scale-105 transition-transform"
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto"
                  style={{ 
                    backgroundColor: 'rgba(198, 93, 46, 0.1)',
                    color: 'var(--color-secondary)'
                  }}
                >
                  <Mail size={24} />
                </div>
                <div className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  Email
                </div>
                <div className="text-lg font-semibold break-all" style={{ color: 'var(--color-text-primary)' }}>
                  stillhousemedia@outlook.com
                </div>
              </a>
            </div>
            
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Share your Airbnb link, desired launch date, and any special experiences you offer. 
              I'll send a tailored concept and project outline within one business day.
            </p>
          </div>
        </Motion.div>
      </Section>
    </>
  )
}
