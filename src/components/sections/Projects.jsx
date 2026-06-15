import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { PROJECTS } from '@/lib/data'

function Tag({ label }) {
  return (
    <span className="px-2 py-0.5 rounded text-xs font-mono bg-surface border border-border text-text-muted">
      {label}
    </span>
  )
}

/**
 * Shows the project's photo from /public/projects. If the file isn't there
 * yet (or fails to load) it gracefully falls back to the emoji + gradient,
 * so the site never shows a broken image.
 */
function ProjectImage({ project, emojiSize }) {
  const [failed, setFailed] = useState(false)
  const showImage = project.image && !failed

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: showImage
          ? undefined
          : `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
      }}
    >
      {showImage ? (
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span style={{ fontSize: emojiSize }}>{project.icon}</span>
      )}
    </div>
  )
}

function ProjectCard({ project, index, featured = false }) {
  const { ref, inView } = useScrollReveal()

  if (featured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative group card-hover rounded-2xl border border-border bg-card overflow-hidden mb-6"
      >
        {/* Gold accent top bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Project photo (falls back to emoji) */}
          <div
            className="relative rounded-xl overflow-hidden flex items-center justify-center h-48 md:h-56"
            style={{ border: `1px solid ${project.color}30` }}
          >
            <ProjectImage project={project} emojiSize="4.5rem" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at center, ${project.color}10, transparent)` }}
            />
          </div>

          {/* Right: Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: `${project.color}20`, color: project.color }}
              >
                Featured
              </span>
            </div>
            <h3 className="font-display font-bold text-2xl mb-3">{project.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-5">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => <Tag key={tag} label={tag} />)}
            </div>
            <div className="flex items-center gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-text-secondary hover:text-gold transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon /> GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-gold hover:text-gold-bright transition-colors flex items-center gap-1.5"
                >
                  Live demo →
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group card-hover rounded-2xl border border-border bg-card overflow-hidden flex flex-col"
    >
      {/* Color bar */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      {/* Photo area (falls back to emoji) */}
      <div className="relative h-32 overflow-hidden">
        <ProjectImage project={project} emojiSize="3rem" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-lg mb-2">{project.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => <Tag key={tag} label={tag} />)}
        </div>
        <div className="flex items-center gap-4 pt-3 border-t border-border">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer"
              className="text-xs text-text-secondary hover:text-gold transition-colors flex items-center gap-1">
              <GithubIcon size={14} /> GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer"
              className="text-xs text-gold hover:text-gold-bright transition-colors">
              Live →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

export default function Projects() {
  const { ref, inView } = useScrollReveal()

  const featured = PROJECTS.find((p) => p.featured)
  const rest = PROJECTS.filter((p) => !p.featured)

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <SectionLabel>Projects</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">
            Things I've built
          </h2>
          <p className="text-text-secondary max-w-xl">
            From first design to a polished app on the store — a selection of what I've shipped.
          </p>
        </motion.div>

        {/* Featured project */}
        {featured && <ProjectCard project={featured} index={0} featured />}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {rest.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
