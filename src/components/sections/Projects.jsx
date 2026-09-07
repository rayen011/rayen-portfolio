import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import SpotlightCard from '@/components/ui/SpotlightCard'
import { PROJECTS, MORE_PROJECTS, SOCIAL_LINKS } from '@/lib/data'

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function Tag({ label, color }) {
  return (
    <span
      className="px-2.5 py-1 rounded-md text-[11px] font-mono border text-text-secondary"
      style={{ borderColor: `${color}33`, background: `${color}0d` }}
    >
      {label}
    </span>
  )
}

/**
 * Sticky stacking card. As the next card scrolls over, this one eases down in
 * scale and dims, giving the "deck of cards" effect.
 */
function ProjectCard({ project, index, total, progress }) {
  const targetScale = 1 - (total - 1 - index) * 0.045
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])
  const dim = useTransform(progress, [index / total, 1], [0, 0.55])
  const imgRef = useRef(null)
  const { scrollYProgress: imgProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(imgProgress, [0, 1], ['-5%', '5%'])
  const href = project.live || project.github

  return (
    <div
      className="sticky mb-6 md:mb-10"
      style={{ top: `calc(5.5rem + ${index * 1.1}rem)` }}
    >
      <motion.article
        style={{ scale, transformOrigin: 'top center' }}
        className="relative rounded-[1.75rem] border border-transparent overflow-hidden bg-card shadow-card"
        data-project={project.id}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(135deg, ${project.color}16, transparent 45%)` }} />
        <div className="absolute inset-0 rounded-[1.75rem] pointer-events-none" style={{ boxShadow: `inset 0 0 0 1px ${project.color}33` }} />
        <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-base pointer-events-none z-20" />

        <div className="relative grid lg:grid-cols-2">
          {/* Image */}
          <a
            ref={imgRef}
            href={href}
            target="_blank"
            rel="noreferrer"
            data-cursor="View"
            className="relative block aspect-[4/3] lg:aspect-auto lg:min-h-[560px] overflow-hidden group border-b lg:border-b-0 lg:border-r border-white/5"
          >
            <motion.img
              src={project.image}
              alt={project.imageAlt}
              loading={index === 0 ? 'eager' : 'lazy'}
              style={{ y: imgY, scale: 1.1 }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:!scale-[1.16]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent lg:bg-gradient-to-r" />
            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full glass border border-white/10 font-mono text-[11px] text-text-primary">{project.type}</span>
              <span className="px-3 py-1 rounded-full glass border border-white/10 font-mono text-[11px] text-text-secondary">{project.year}</span>
            </div>
          </a>

          {/* Content */}
          <div className="p-7 md:p-10 lg:p-12 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs text-text-muted">
                {String(index + 1).padStart(2, '0')} <span className="opacity-50">/ {String(total).padStart(2, '0')}</span>
              </span>
              {project.featured && (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: `${project.color}22`, color: project.color }}>
                  Latest
                </span>
              )}
            </div>

            <h3 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-3">{project.title}</h3>
            <p className="text-lg md:text-xl font-medium mb-5" style={{ color: project.color }}>{project.tagline}</p>
            <p className="text-text-secondary text-sm md:text-[15px] leading-relaxed mb-7">{project.description}</p>

            <ul className="space-y-2.5 mb-8">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-text-secondary">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: project.color }} />
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((t) => <Tag key={t} label={t} color={project.color} />)}
            </div>

            <div className="mt-auto flex items-center gap-6 pt-6 border-t border-white/5">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                  <GithubIcon /> Source
                </a>
              )}
              {project.live ? (
                <a href={project.live} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-sm font-semibold" style={{ color: project.color }}>
                  {project.liveLabel}
                  <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm text-text-muted font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-muted" /> {project.liveLabel}: coming soon
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

function MoreCard({ project, index }) {
  const Wrapper = project.github ? 'a' : 'div'
  const wrapperProps = project.github
    ? { href: project.github, target: '_blank', rel: 'noreferrer', 'data-cursor': 'Open' }
    : {}
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className="h-full"
    >
      <SpotlightCard color={`${project.color}99`} className="h-full group" innerClassName="p-6 flex flex-col">
        <Wrapper {...wrapperProps} className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-5">
            <span
              className="px-2.5 py-1 rounded-full text-[11px] font-mono"
              style={{ background: `${project.color}18`, color: project.color }}
            >
              {project.status}
            </span>
            <span className="text-text-muted transition-all duration-300 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </div>
          <h4 className="font-display font-bold text-xl mb-2 tracking-tight">{project.title}</h4>
          <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-5">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => <Tag key={t} label={t} color={project.color} />)}
          </div>
        </Wrapper>
      </SpotlightCard>
    </motion.div>
  )
}

export default function Projects() {
  const stackRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] })

  return (
    <section id="work" className="section-padding relative">
      <div className="container-x">
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title="Things I've *shipped.*"
          description="Real apps with real users in mind — designed, built and released end to end. Scroll through the stack."
          className="mb-14"
        />
      </div>

      <div ref={stackRef} className="container-x">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} total={PROJECTS.length} progress={scrollYProgress} />
        ))}
      </div>

      {/* More builds */}
      <div className="container-x mt-20 md:mt-28">
        <div className="flex items-end justify-between mb-8 gap-6 flex-wrap">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-gold mb-2">More builds</p>
            <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight">Also on the shelf</h3>
          </div>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-text-secondary hover:text-gold transition-colors"
          >
            <GithubIcon /> Everything on GitHub
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MORE_PROJECTS.map((p, i) => <MoreCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
