import { motion } from 'framer-motion'
import SectionWrapper, { fadeUp } from '../components/SectionWrapper'
import { skills } from '../data/content'
import GradientText from '../components/ui/GradientText'

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="bg-surface/30 rounded-none">
      <motion.h2 variants={fadeUp} className="section-title">
        Skills & <GradientText>Tools</GradientText>
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-muted">
        {/* TODO: optional intro line — edit or remove */}
        Technologies I reach for to build great apps.
      </motion.p>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {/* TODO: skill groups from content.js */}
        {skills.map((group) => (
          <motion.div key={group.category} variants={fadeUp} className="card">
            <h3 className="mb-5 text-lg font-bold">
              <GradientText>{group.category}</GradientText>
            </h3>
            <ul className="space-y-5">
              {group.items.map((skill) => (
                <li key={skill.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-body">{skill.name}</span>
                    <span className="text-xs text-muted">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
                    <motion.div
                      className="h-full rounded-full bg-gradient-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
