// Custom eased smooth-scroll so section navigation glides slowly and
// smoothly (the browser's native `scroll-behavior: smooth` is fast and
// not configurable). Used by the navbar links, Hero CTA, and scroll
// indicator. Respects prefers-reduced-motion (jumps instantly).

const NAV_OFFSET = 72 // height of the fixed navbar, in px

// easeInOutCubic — slow start, slow end, smooth middle
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export function scrollToId(id, duration = 1100) {
  const el = document.getElementById(id)
  if (!el) return

  const targetY = Math.max(
    0,
    el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET,
  )

  // Honor reduced-motion preferences — no animation.
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches
  if (prefersReduced) {
    window.scrollTo(0, targetY)
    return
  }

  const startY = window.scrollY
  const distance = targetY - startY
  if (Math.abs(distance) < 1) return

  let startTime = null

  const step = (now) => {
    if (startTime === null) startTime = now
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + distance * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}
