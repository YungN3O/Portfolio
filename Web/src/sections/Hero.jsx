import { motion } from 'framer-motion'
import { HiArrowDown } from 'react-icons/hi'
import { profile } from '../data/content'
import GradientText from '../components/ui/GradientText'
import AppStoreBadge from '../components/AppStoreBadge'
import { scrollToId } from '../utils/scrollTo'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* The live background is rendered globally in App via <AnimatedBackground />. */}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-6xl px-5 py-28 sm:px-8"
      >
        <motion.p
          variants={item}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-accent"
        >
          {/* TODO: tweak this greeting if you like */}
          Hi, my name is
        </motion.p>

        {/* Name — TODO: from content.js */}
        <motion.h1
          variants={item}
          className="text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl"
        >
          <GradientText>{profile.name}</GradientText>
        </motion.h1>

        {/* Title — TODO: from content.js */}
        <motion.h2
          variants={item}
          className="mt-3 text-2xl font-bold text-muted sm:text-4xl"
        >
          {profile.title}
        </motion.h2>

        {/* Tagline — TODO: from content.js */}
        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('projects')
            }}
            className="btn-primary"
          >
            View My Work
          </a>
          {/* TODO: "Download iOS App" links to the App Store — replace placeholder URL */}
          <a
            href={profile.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Download iOS App
          </a>
        </motion.div>


      </motion.div>

      {/* Scroll-down indicator */}
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          scrollToId('about')
        }}
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition hover:text-accent"
      >
        <HiArrowDown className="animate-bounce-down" size={26} />
      </a>
    </section>
  )
}
