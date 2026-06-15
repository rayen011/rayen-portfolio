import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { SOCIAL_LINKS } from '@/lib/data'

export default function Contact() {
  const { ref, inView } = useScrollReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error'

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // Replace with your email service (Formspree, EmailJS, etc.)
    // For now, simulates success after 1.2s
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Contact</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">
            Let's build something
          </h2>
          <p className="text-text-secondary mb-12 max-w-lg">
            Available for freelance projects, remote work, and collaborations.
            Based in Tunisia — working with clients worldwide.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Left: Form */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center h-full py-10 gap-4">
                  <span className="text-4xl">✅</span>
                  <p className="font-display font-semibold text-xl">Message sent!</p>
                  <p className="text-text-secondary text-sm text-center">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus(null)}
                    className="mt-2 text-gold text-sm hover:underline"
                  >
                    Send another →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-text-secondary text-xs font-mono mb-1.5 uppercase tracking-wide">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary text-xs font-mono mb-1.5 uppercase tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary text-xs font-mono mb-1.5 uppercase tracking-wide">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3 rounded-lg bg-gold text-base font-display font-semibold text-sm
                      hover:bg-gold-bright transition-all duration-200 hover:shadow-gold
                      disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send message →'}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Links + info */}
            <div className="flex flex-col justify-center gap-6">
              <div className="space-y-1">
                <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Or reach me directly</p>
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="flex items-center gap-3 text-text-secondary hover:text-gold transition-colors group py-2"
                >
                  <span className="w-8 h-8 rounded-lg border border-border bg-surface flex items-center justify-center text-sm group-hover:border-gold group-hover:bg-gold/10 transition-all">
                    ✉️
                  </span>
                  <span className="text-sm">{SOCIAL_LINKS.email}</span>
                </a>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-text-secondary hover:text-gold transition-colors group py-2"
                >
                  <span className="w-8 h-8 rounded-lg border border-border bg-surface flex items-center justify-center text-sm group-hover:border-gold group-hover:bg-gold/10 transition-all">
                    <GithubIcon />
                  </span>
                  <span className="text-sm">github.com/rayen</span>
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-text-secondary hover:text-gold transition-colors group py-2"
                >
                  <span className="w-8 h-8 rounded-lg border border-border bg-surface flex items-center justify-center text-sm group-hover:border-gold group-hover:bg-gold/10 transition-all">
                    💼
                  </span>
                  <span className="text-sm">linkedin.com/in/rayen</span>
                </a>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5">
                <p className="text-xs font-mono text-gold uppercase tracking-widest mb-2">Availability</p>
                <p className="font-display font-semibold mb-1">Open to opportunities</p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Freelance projects, remote contracts, and interesting collaborations.
                  Response within 24 hours.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400 text-xs font-mono">Available now</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}
