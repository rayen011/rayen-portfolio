import { SOCIAL_LINKS } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display font-bold text-lg">
          <span className="text-gold">R</span>ayen<span className="text-gold">.</span>
        </p>
        <p className="text-text-muted text-sm">
          Built with React + Tailwind · Deployed on Vercel
        </p>
        <div className="flex items-center gap-6">
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-gold transition-colors text-sm">
            GitHub
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-gold transition-colors text-sm">
            LinkedIn
          </a>
          <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-text-secondary hover:text-gold transition-colors text-sm">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
