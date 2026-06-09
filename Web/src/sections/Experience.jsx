import { motion } from 'framer-motion'
import { HiBriefcase, HiLocationMarker } from 'react-icons/hi'
import SectionWrapper, { fadeUp } from '../components/SectionWrapper'
import { experience } from '../data/content'
import GradientText from '../components/ui/GradientText'

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <motion.h2 variants={fadeUp} className="section-title">
        Work <GradientText>Experience</GradientText>
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-muted">
        {/* TODO: optional intro line — edit or remove */}
        A timeline of roles where I’ve shipped real products.
      </motion.p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {/* TODO: experience entries from content.js */}
        {experience.map((job, i) => (
          <motion.article
            key={i}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="card group hover:border-accent/70 hover:shadow-glow"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-accent text-black">
                <HiBriefcase size={22} />
              </div>
              <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-accent">
                {job.period}
              </span>
            </div>

            <h3 className="text-lg font-bold text-body">{job.role}</h3>
            <p className="font-medium text-muted">{job.company}</p>
            {job.location && (
              <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                <HiLocationMarker /> {job.location}
              </p>
            )}

            <ul className="mt-4 space-y-2 text-sm text-muted">
              {job.bullets.map((b, j) => (
                <li key={j} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  )
}
