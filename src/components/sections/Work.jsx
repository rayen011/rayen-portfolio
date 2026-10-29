import { useCallback, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import ProjectStar from '@/components/galaxy/ProjectStar'
import ProjectPanel from '@/components/galaxy/ProjectPanel'
import { PROJECTS, MORE_PROJECTS, STAR_MAP, CONSTELLATION, SOCIAL_LINKS } from '@/lib/data'

/** Faint lines between projects that share a stack, traced in on first view. */
function Constellation() {
  return (
    <svg className="map-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {CONSTELLATION.map(([from, to], i) => {
        const a = STAR_MAP[from]
        const b = STAR_MAP[to]
        if (!a || !b) return null
        return (
          <motion.line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.3, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        )
      })}
    </svg>
  )
}

export default function Work() {
  const [openId, setOpenId] = useState(null)
  const triggerRef = useRef(null)

  // The six case studies plus the smaller builds, all on one map. Companions
  // keep their own shape (no image or highlights); the panel adapts.
  const all = useMemo(() => [...PROJECTS, ...MORE_PROJECTS], [])
  const open = openId ? all.find((p) => p.id === openId) : null

  const onOpen = useCallback((id) => {
    triggerRef.current = document.activeElement
    setOpenId(id)
  }, [])

  const onClose = useCallback(() => {
    setOpenId(null)
    // Send focus back to the star that was opened, so keyboard users don't
    // get dropped at the top of the document.
    triggerRef.current?.focus?.()
  }, [])

  return (
    <section id="work" className="section-padding relative">
      <div className="container-x">
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title="Eleven things I've *shipped.*"
          description="Every project is a star — the brighter it burns, the bigger the build. Pick one to open it."
          className="mb-12"
        />
      </div>

      <div className="container-x">
        <div className="star-map">
          <Constellation />

          {all.map((project, i) => {
            const star = STAR_MAP[project.id]
            if (!star) return null
            return (
              <ProjectStar
                key={project.id}
                project={project}
                star={star}
                index={i}
                labelled={star.weight >= 0.7}
                open={openId === project.id}
                onOpen={onOpen}
              />
            )
          })}

          <AnimatePresence>
            {open && (
              <ProjectPanel
                key={open.id}
                project={open}
                star={STAR_MAP[open.id]}
                onClose={onClose}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="label-mono text-text-muted">
            {PROJECTS.length} case studies · {MORE_PROJECTS.length} more builds
          </p>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-text-secondary hover:text-gold transition-colors"
          >
            Everything on GitHub
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
