import { motion } from 'framer-motion'
import { PROFILE, SOCIAL_LINKS } from '@/lib/data'
import { scrollToTarget } from '@/components/ui/SmoothScroll'
import Magnetic from '@/components/ui/Magnetic'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border bg-surface overflow-hidden">
      {/* Giant name */}
      <div className="container-x pt-14 md:pt-20">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5% 0px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="group font-display font-extrabold leading-[0.85] tracking-tighter text-[22vw] md:text-[15vw] select-none text-outline transition-colors duration-700 hover:text-text-primary cursor-default"
          aria-hidden="true"
        >
          {PROFILE.firstName.toUpperCase()}
        </motion.p>
      </div>

      <div className="container-x py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-border/60 mt-8">
        <div>
          <p className="font-display font-extrabold text-lg">
            {PROFILE.firstName}<span className="text-gold">.</span>
          </p>
          <p className="text-text-muted text-xs mt-1 font-mono">
            © {year} {PROFILE.firstName} {PROFILE.lastName} · Built with React, Framer Motion & Tailwind
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-gold transition-colors">GitHub</a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-gold transition-colors">LinkedIn</a>
          <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-text-secondary hover:text-gold transition-colors">Email</a>

          <Magnetic strength={0.4}>
            <button
              onClick={() => scrollToTarget(0)}
              aria-label="Back to top"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold hover:shadow-gold-sm transition-all"
            >
              ↑
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  )
}
