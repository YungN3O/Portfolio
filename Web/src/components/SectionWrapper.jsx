import { motion } from 'framer-motion'

// Reusable animated <section> wrapper. Fades + slides its contents up
// when scrolled into view. Use the exported `fadeUp` / `stagger` variants
// on child motion elements for staggered reveals.

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

export const fadeUp = {
  hidden: { y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function SectionWrapper({ id, className = '', children }) {
  return (
    <motion.section
      id={id}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0, fallbackInView: true }}
      className={`mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28 ${className}`}
    >
      {children}
    </motion.section>
  )
}
