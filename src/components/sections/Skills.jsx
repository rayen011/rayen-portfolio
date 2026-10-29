import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import Marquee from '@/components/ui/Marquee'
import SpotlightCard from '@/components/ui/SpotlightCard'
import { SKILL_ROWS, NOW } from '@/lib/data'

const ROW_COLORS = ['#F5A623', '#3B82F6', '#8B5CF6']

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="container-x">
        <SectionHeading
          index="05"
          eyebrow="Toolbox"
          title="What I *work with.*"
          description="From the first wireframe to the store listing — the full stack I reach for."
          className="mb-12"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="belt space-y-4"
      >
        {SKILL_ROWS.map((row, r) => (
          <Marquee
            key={r}
            items={row}
            reverse={r % 2 === 1}
            speed={46 + r * 8}
            className={`belt-row belt-row--${r}`}
            render={(skill) => (
              <span className="mx-2 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.04] font-mono text-sm text-text-secondary hover:border-gold/60 hover:text-text-primary hover:shadow-gold-sm transition-all duration-300 cursor-default whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: ROW_COLORS[r] }} />
                {skill}
              </span>
            )}
          />
        ))}
      </motion.div>

      {/* Right now */}
      <div className="container-x mt-16 md:mt-20">
        <div className="grid md:grid-cols-3 gap-5">
          {NOW.map((item, i) => {
            // Cards with a link become one; the rest stay plain blocks.
            const Body = item.href ? 'a' : 'div'
            const bodyProps = item.href
              ? { href: item.href, target: '_blank', rel: 'noreferrer', 'data-cursor': 'Open' }
              : {}
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <SpotlightCard color={`${item.accent}99`} className="h-full group" innerClassName="p-6 md:p-7">
                  <Body {...bodyProps} className="flex flex-col h-full">
                    <div className="flex items-center justify-between gap-2 mb-4 label-mono text-text-muted">
                      <span className="flex items-center gap-2">
                        {item.live ? (
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: item.accent }} />
                            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: item.accent }} />
                          </span>
                        ) : (
                          <span className="w-2 h-2 rounded-full" style={{ background: item.accent }} />
                        )}
                        {item.label}
                      </span>
                      {item.href && (
                        <span className="transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: item.accent }}>↗</span>
                      )}
                    </div>
                    <h3 className="font-display font-extrabold text-2xl tracking-tight mb-2">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.body}</p>
                  </Body>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
