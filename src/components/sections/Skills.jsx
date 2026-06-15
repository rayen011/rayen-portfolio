import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { SKILLS } from '@/lib/data'

function SkillPill({ label, index, inView }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="inline-flex items-center px-3 py-1.5 rounded-full border border-border
        bg-surface text-text-secondary text-sm font-mono
        hover:border-gold/50 hover:text-gold hover:bg-gold/5 hover:shadow-gold-sm
        transition-all duration-200 cursor-default"
    >
      {label}
    </motion.span>
  )
}

function SkillGroup({ title, icon, skills, inView }) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-display font-semibold text-lg">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <SkillPill key={skill} label={skill} index={i} inView={inView} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useScrollReveal()

  return (
    <section id="skills" className="section-padding bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Skills</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">
            What I work with
          </h2>
          <p className="text-text-secondary mb-12 max-w-xl">
            From first wireframe to shipped app — the full toolkit.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <SkillGroup
              title="App Development"
              icon="📱"
              skills={SKILLS.development}
              inView={inView}
            />
            <SkillGroup
              title="UI/UX Design"
              icon="🎨"
              skills={SKILLS.design}
              inView={inView}
            />
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🛠️</span>
              <h3 className="font-display font-semibold text-lg">Tools & Platforms</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {SKILLS.tools.map((skill, i) => (
                <SkillPill key={skill} label={skill} index={i} inView={inView} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
