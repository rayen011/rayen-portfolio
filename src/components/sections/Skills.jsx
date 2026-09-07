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
        className="space-y-4"
      >
        {SKILL_ROWS.map((row, r) => (
          <Marquee
            key={r}
            items={row}
            reverse={r % 2 === 1}
            speed={46 + r * 8}
            render={(skill) => (
              <span className="mx-2 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-border bg-surface font-mono text-sm text-text-secondary hover:border-gold/60 hover:text-text-primary hover:shadow-gold-sm transition-all duration-300 cursor-default whitespace-nowrap">
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
          {NOW.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <SpotlightCard color={`${item.accent}99`} className="h-full" innerClassName="p-6 md:p-7">
                <div className="flex items-center gap-2 mb-4 font-mono text-[11px] uppercase tracking-widest text-text-muted">
                  {item.live ? (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: item.accent }} />
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: item.accent }} />
                    </span>
                  ) : (
                    <span className="w-2 h-2 rounded-full" style={{ background: item.accent }} />
                  )}
                  {item.label}
                </div>
                <h3 className="font-display font-extrabold text-2xl tracking-tight mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.body}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
