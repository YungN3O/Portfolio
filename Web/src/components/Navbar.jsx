import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { navLinks, profile } from '../data/content'
import GradientText from './ui/GradientText'
import ThemeSwitcher from './ThemeSwitcher'
import { scrollToId } from '../utils/scrollTo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  // Translucent / blurred background once the user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scrollspy — highlight the link for the section currently in view
  useEffect(() => {
    const ids = navLinks.map((l) => l.id)
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Intercept anchor clicks for the slow, eased custom scroll
  const handleNavClick = (e, id) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
    // Keep the URL hash in sync without triggering a native jump
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-line bg-bg/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Logo / name — TODO: name comes from content.js */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="text-lg font-extrabold tracking-tight"
        >
          <GradientText>{profile.name}</GradientText>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active === link.id
                    ? 'text-accent'
                    : 'text-muted hover:text-body'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme switcher — desktop */}
        <div className="hidden items-center md:flex">
          <ThemeSwitcher />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="rounded-lg p-2 text-body transition hover:text-accent md:hidden"
        >
          {open ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-line bg-bg/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`block rounded-lg px-4 py-3 text-base font-medium transition ${
                      active === link.id
                        ? 'bg-surface text-accent'
                        : 'text-muted hover:bg-surface hover:text-body'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="px-4 py-3">
                <ThemeSwitcher />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
