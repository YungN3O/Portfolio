import { motion } from 'framer-motion'
import { FaGithub, FaAppStoreIos } from 'react-icons/fa'
import SectionWrapper, { fadeUp } from '../components/SectionWrapper'
import { projects } from '../data/content'
import GradientText from '../components/ui/GradientText'

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <motion.h2 variants={fadeUp} className="section-title">
        Featured <GradientText>Projects</GradientText>
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-muted">
        {/* TODO: optional intro line — edit or remove */}
        A selection of iOS apps I’ve designed and built.
      </motion.p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* TODO: project entries from content.js */}
        {projects.map((project, i) => (
          <motion.article
            key={i}
            variants={fadeUp}
            whileHover={{ y: -8 }}
            className="card group flex flex-col hover:border-accent/70 hover:shadow-glow"
          >
            {/* Accent header strip */}
            <div className="mb-4 h-1.5 w-12 rounded-full bg-gradient-accent transition-all duration-300 group-hover:w-20" />

            <h3 className="text-xl font-bold text-body">{project.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {project.description}
            </p>

            {/* Tech stack chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>

            {/* Optional "coming soon" status while not yet on the App Store */}
            {project.appStoreUrl === '#' && project.appStoreStatus && (
              <p className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <FaAppStoreIos size={13} /> {project.appStoreStatus}
              </p>
            )}

            {/* Links */}
            <div className="mt-6 flex items-center gap-3 border-t border-line pt-4">
              {/* TODO: real GitHub repo link (project.githubUrl) */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} on GitHub`}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-accent"
              >
                <FaGithub size={18} /> Code
              </a>
              {/* App Store link only shows once a real URL is set (not '#') */}
              {project.appStoreUrl !== '#' && (
                <a
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} on the App Store`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-accent"
                >
                  <FaAppStoreIos size={18} /> App Store
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  )
}
