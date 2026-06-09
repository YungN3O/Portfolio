import { motion } from 'framer-motion'
import { HiMail } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import SectionWrapper, { fadeUp } from '../components/SectionWrapper'
import { profile } from '../data/content'
import GradientText from '../components/ui/GradientText'

export default function Contact() {
  return (
    <SectionWrapper id="contact" className="text-center">
      <motion.p
        variants={fadeUp}
        className="text-sm font-semibold uppercase tracking-[0.25em] text-accent"
      >
        Get in touch
      </motion.p>

      <motion.h2 variants={fadeUp} className="section-title mt-3">
        Let’s <GradientText>build something</GradientText>
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mx-auto mt-5 max-w-xl text-muted"
      >
        {/* TODO: optional closing line — edit or remove */}
        Have a project in mind or just want to say hi? My inbox is always open.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        {/* TODO: real email (profile.email) */}
        <a href={`mailto:${profile.email}`} className="btn-primary">
          <HiMail size={18} /> {profile.email}
        </a>
        {/* TODO: real GitHub URL (profile.github) */}
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          <FaGithub size={18} /> GitHub
        </a>
      </motion.div>
    </SectionWrapper>
  )
}
