import { useEffect, useRef } from 'react'
import { useTheme, THEMES } from '../context/ThemeContext'

export default function AnimatedBackground() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    // Parse "R G B" string from theme vars into [r, g, b]
    function hexToRgb(hex) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return [r, g, b]
    }

    const [r1, g1, b1] = hexToRgb(THEMES[theme].from)
    const [r2, g2, b2] = hexToRgb(THEMES[theme].to)

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Beam sweeps diagonally — progress goes 0 → 1 over `duration` ms,
    // then instantly resets and repeats.
    const duration = 5000 // ms per sweep
    let start = null

    function draw(ts) {
      if (!start) start = ts
      const progress = ((ts - start) % duration) / duration // 0..1

      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)

      // The beam center moves diagonally: starts off top-right, ends off bottom-left.
      // We map progress along a line from (1.2W, -0.2H) to (-0.2W, 1.2H).
      const cx = W * (1.2 - progress * 1.4)
      const cy = H * (-0.2 + progress * 1.4)

      // Beam is a thin diagonal strip — we use two radial gradients stacked:
      // 1. A wide, very soft glow for the ambient halo
      // 2. A narrow, brighter core

      const haloRadius = Math.max(W, H) * 0.65
      const coreRadius = Math.max(W, H) * 0.25

      // Ambient halo
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloRadius)
      halo.addColorStop(0, `rgba(${r1},${g1},${b1},0.18)`)
      halo.addColorStop(0.5, `rgba(${r2},${g2},${b2},0.10)`)
      halo.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = halo
      ctx.fillRect(0, 0, W, H)

      // Bright core
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius)
      core.addColorStop(0, `rgba(${r1},${g1},${b1},0.45)`)
      core.addColorStop(0.4, `rgba(${r2},${g2},${b2},0.28)`)
      core.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = core
      ctx.fillRect(0, 0, W, H)

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ background: 'rgb(10 10 11)' }}
    />
  )
}
