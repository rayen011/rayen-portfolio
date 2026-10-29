import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { getLenis } from '@/components/ui/SmoothScroll'

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

const rgbChannels = (hex) =>
  [0, 2, 4].map((i) => parseInt(hex.replace('#', '').slice(i, i + 2), 16)).join(', ')

/**
 * The case study, opened over the map.
 *
 * It scales out of the star's own coordinates, so the star appears to unfold
 * rather than a dialog appearing from nowhere. Handles both shapes of project:
 * the six full case studies and the smaller companion builds, which have no
 * image, tagline or highlights.
 */
export default function ProjectPanel({ project, star, onClose }) {
  const ref = useRef(null)
  const closeRef = useRef(null)

  // Escape to close, Tab cycles inside the panel while it's open.
  useEffect(() => {
    closeRef.current?.focus()
    const lenis = getLenis()
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const focusable = ref.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      getLenis()?.start()
    }
  }, [onClose])

  const channels = rgbChannels(project.color)

  return (
    <>
      <motion.div
        className="panel-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
      />

      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        className="panel-shell"
        style={{ transformOrigin: `${star.x}% ${star.y}%`, '--chip': channels }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.75 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="panel-glow"
          style={{ background: `radial-gradient(60% 70% at 50% 0%, rgba(${channels}, 0.3), transparent 70%)` }}
        />

        <button ref={closeRef} onClick={onClose} className="panel-close" aria-label="Back to the map">
          ✕
        </button>

        <div className="panel-scroll" data-lenis-prevent>
          {project.image && (
            <div className="panel-image">
              <img src={project.image} alt={project.imageAlt} />
              <div className="panel-image-fade" />
            </div>
          )}

          <div className="panel-body">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {project.type && <span className="chip">{project.type}</span>}
              {project.year && <span className="chip">{project.year}</span>}
              {project.status && <span className="chip chip--solid">{project.status}</span>}
              {(project.badge || project.live) && (
                <span className="chip chip--solid">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
                  </span>
                  {project.badge || 'Live'}
                </span>
              )}
            </div>

            <h3 className="font-display font-extrabold display-md mb-3">{project.title}</h3>

            {project.tagline && (
              <p className="text-lg md:text-xl font-medium mb-5" style={{ color: project.color }}>
                {project.tagline}
              </p>
            )}

            <p className="text-text-secondary text-sm md:text-[15px] leading-relaxed mb-7">
              {project.description}
            </p>

            {project.highlights && (
              <ul className="space-y-2.5 mb-7">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span
                      className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: project.color }}
                    />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-2 mb-7">
              {project.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-6 border-t border-white/10">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  <GithubIcon /> Source
                </a>
              )}
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: project.color }}
                >
                  {project.liveLabel}
                  <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              ) : (
                project.liveLabel && (
                  <span className="inline-flex items-center gap-2 text-sm text-text-muted font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-muted" /> {project.liveLabel}: coming soon
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
