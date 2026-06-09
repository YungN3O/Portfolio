import { motion } from 'framer-motion'
import { HiAcademicCap } from 'react-icons/hi'
import SectionWrapper, { fadeUp } from '../components/SectionWrapper'
import { about, profile } from '../data/content'
import GradientText from '../components/ui/GradientText'

export default function About() {
  return (
    <SectionWrapper id="about">
      <motion.h2 variants={fadeUp} className="section-title">
        About <GradientText>Me</GradientText>
      </motion.h2>

      <div className="mt-12 grid items-start gap-10 md:grid-cols-[320px,1fr] md:gap-14">
        {/* Photo / placeholder */}
        <motion.div variants={fadeUp} className="mx-auto w-full max-w-xs">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface-2 shadow-glow">
            {about.photo ? (
              // TODO: photo path comes from content.js (about.photo)
              <img
                src={about.photo}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface-2 to-surface p-6 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-accent text-2xl font-black text-black">
                  {/* Initials placeholder */}
                  {profile.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                {/* TODO: add your photo — set `about.photo` in content.js */}
                <p className="text-xs text-muted">
                  TODO: add your photo
                  <br />
                  (set <code className="text-accent">about.photo</code>)
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Bio + education */}
        <div>
          {/* TODO: bio paragraphs from content.js */}
          <motion.div variants={fadeUp} className="space-y-4 text-muted">
            {about.bio.map((para, i) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))}
          </motion.div>

          {/* Education */}
          <motion.div variants={fadeUp} className="mt-8">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <HiAcademicCap className="text-accent" /> Education
            </h3>
            <ul className="space-y-4">
              {/* TODO: education entries from content.js */}
              {about.education.map((ed, i) => (
                <li key={i} className="card hover:border-accent/60">
                  <p className="font-semibold text-body">{ed.degree}</p>
                  <p className="text-sm text-muted">{ed.school}</p>
                  <p className="mt-1 text-xs text-accent">{ed.period}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
