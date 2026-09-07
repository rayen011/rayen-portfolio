import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import Magnetic from '@/components/ui/Magnetic'
import { PROFILE, SOCIAL_LINKS, FORM_ENDPOINT } from '@/lib/data'

const PROJECT_TYPES = ['Mobile app', 'Web / SaaS MVP', 'UI/UX design', 'Fix my app', 'Something else']

function useLocalTime(timeZone) {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 15000)
    return () => clearInterval(id)
  }, [timeZone])
  return time
}

function CheckAnimation() {
  return (
    <svg viewBox="0 0 64 64" className="w-20 h-20">
      <motion.circle
        cx="32" cy="32" r="28" fill="none" stroke="#F5A623" strokeWidth="2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease: 'easeOut' }}
      />
      <motion.path
        d="M20 33l8 8 16-17" fill="none" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
      />
    </svg>
  )
}

export default function Contact() {
  const time = useLocalTime(PROFILE.timezone)
  const [form, setForm] = useState({ name: '', email: '', type: PROJECT_TYPES[0], message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [copied, setCopied] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${PROFILE.email}`
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    if (FORM_ENDPOINT) {
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('bad status')
        setStatus('sent')
        setForm({ name: '', email: '', type: PROJECT_TYPES[0], message: '' })
      } catch {
        setStatus('error')
      }
      return
    }
    // No endpoint configured: open a pre-filled email instead.
    const subject = encodeURIComponent(`${form.type} — ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
    setTimeout(() => setStatus('sent'), 600)
  }

  const inputCls =
    'w-full bg-surface border border-border rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold/70 focus:shadow-gold-sm transition-all'

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-gold/[0.07] blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="container-x grid lg:grid-cols-12 gap-14 lg:gap-10 relative">
        {/* Left */}
        <div className="lg:col-span-6">
          <SectionHeading
            index="06"
            eyebrow="Contact"
            title="Let's build something people *open every day.*"
            description="Send me your scope — an idea, a Figma file, or an app that needs fixing — and I'll reply with a clear plan and an honest estimate."
          />

          {/* Email */}
          <div className="mt-10">
            <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-3">Email</p>
            <div className="flex flex-wrap items-center gap-3">
              <a href={`mailto:${PROFILE.email}`} className="font-display font-bold text-xl sm:text-2xl md:text-3xl tracking-tight hover:text-gold transition-colors break-all">
                {PROFILE.email}
              </a>
              <Magnetic strength={0.3}>
                <button
                  onClick={copyEmail}
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all"
                  aria-label="Copy email"
                >
                  {copied ? '✓' : '⧉'}
                </button>
              </Magnetic>
            </div>
          </div>

          {/* Local time + availability */}
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-border bg-surface font-mono text-xs text-text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              {PROFILE.availabilityLabel}
            </div>
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-border bg-surface font-mono text-xs text-text-secondary tabular-nums">
              <span className="text-gold">◔</span> {time || '--:--'} in {PROFILE.location} · replies within 24h
            </div>
          </div>

          {/* Socials */}
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {[
              { label: 'GitHub', href: SOCIAL_LINKS.github, handle: 'github.com/rayen011' },
              { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, handle: SOCIAL_LINKS.linkedin.replace('https://', '') },
              ...(SOCIAL_LINKS.upwork ? [{ label: 'Upwork', href: SOCIAL_LINKS.upwork, handle: 'Hire me on Upwork' }] : []),
            ].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between py-4 text-sm"
                >
                  <span className="font-display font-bold text-lg tracking-tight group-hover:text-gold transition-colors">{s.label}</span>
                  <span className="flex items-center gap-3 font-mono text-xs text-text-muted">
                    {s.handle}
                    <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-gold">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <div className="relative rounded-[1.75rem] border border-border bg-card p-6 md:p-8 shadow-card overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-14 gap-4"
                >
                  <CheckAnimation />
                  <p className="font-display font-bold text-2xl">Message on its way</p>
                  <p className="text-text-secondary text-sm max-w-xs">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button onClick={() => setStatus('idle')} className="mt-2 text-gold text-sm hover:underline">
                    Send another →
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} className="relative space-y-4" exit={{ opacity: 0 }}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-text-muted text-[11px] font-mono mb-2 uppercase tracking-widest">Name</label>
                      <input id="name" name="name" value={form.name} onChange={onChange} required placeholder="Your name" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-text-muted text-[11px] font-mono mb-2 uppercase tracking-widest">Email</label>
                      <input id="email" type="email" name="email" value={form.email} onChange={onChange} required placeholder="you@company.com" className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-text-muted text-[11px] font-mono mb-2 uppercase tracking-widest">What do you need?</label>
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_TYPES.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setForm((f) => ({ ...f, type: t }))}
                          className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-all ${
                            form.type === t
                              ? 'border-gold bg-gold/10 text-gold'
                              : 'border-border text-text-secondary hover:border-text-muted'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-text-muted text-[11px] font-mono mb-2 uppercase tracking-widest">Project</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      required
                      rows={5}
                      placeholder="What are you building, for whom, and when would you like it live?"
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-xs font-mono">Something went wrong — email me directly at {PROFILE.email}.</p>
                  )}

                  <Magnetic className="w-full" strength={0.15}>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group w-full py-4 rounded-full bg-gold text-base font-display font-bold text-sm tracking-wide hover:bg-gold-bright hover:shadow-gold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === 'sending' ? 'Sending…' : 'Send message'}
                      <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
                    </button>
                  </Magnetic>
                  <p className="text-center text-[11px] font-mono text-text-muted">
                    {FORM_ENDPOINT ? 'Sent straight to my inbox.' : 'Opens your email app with everything pre-filled.'}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* copied toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[80] px-4 py-2.5 rounded-full glass border border-gold/40 font-mono text-xs text-gold shadow-gold-sm"
          >
            ✓ Email copied
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
