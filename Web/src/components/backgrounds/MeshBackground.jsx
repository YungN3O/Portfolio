import { useEffect, useRef } from 'react'
import { useTheme, THEMES } from '../../context/ThemeContext'

function hexToRgb(hex) {
  return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)]
}

// 6 anchor points — each drifts along its own Lissajous path
const POINTS = [
  { x: 0.20, y: 0.25, ax: 0.18, ay: 0.14, fx: 0.28, fy: 0.32, px: 0.00, py: 1.20 },
  { x: 0.80, y: 0.20, ax: 0.14, ay: 0.20, fx: 0.36, fy: 0.25, px: 2.10, py: 0.70 },
  { x: 0.55, y: 0.65, ax: 0.20, ay: 0.16, fx: 0.22, fy: 0.40, px: 4.20, py: 3.10 },
  { x: 0.10, y: 0.75, ax: 0.12, ay: 0.14, fx: 0.45, fy: 0.30, px: 1.00, py: 2.50 },
  { x: 0.90, y: 0.55, ax: 0.16, ay: 0.12, fx: 0.32, fy: 0.42, px: 3.20, py: 0.30 },
  { x: 0.45, y: 0.10, ax: 0.10, ay: 0.18, fx: 0.40, fy: 0.28, px: 5.10, py: 1.80 },
]

export default function MeshBackground() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    const [r1,g1,b1] = hexToRgb(THEMES[theme].from)
    const [r2,g2,b2] = hexToRgb(THEMES[theme].to)

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let start = null
    function draw(ts) {
      if (!start) start = ts
      const t = (ts - start) * 0.00028

      const W = canvas.width
      const H = canvas.height
      const R = Math.max(W, H) * 0.62

      ctx.clearRect(0, 0, W, H)

      POINTS.forEach((p, i) => {
        const cx = W * (p.x + Math.sin(t * p.fx + p.px) * p.ax)
        const cy = H * (p.y + Math.cos(t * p.fy + p.py) * p.ay)
        const [r,g,b] = i % 2 === 0 ? [r1,g1,b1] : [r2,g2,b2]
        const pulse = 0.13 + 0.04 * Math.sin(t * 0.6 + i * 1.2)

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R)
        grad.addColorStop(0.0, `rgba(${r},${g},${b},${pulse})`)
        grad.addColorStop(0.4, `rgba(${r},${g},${b},${pulse * 0.45})`)
        grad.addColorStop(1.0, `rgba(${r},${g},${b},0)`)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [theme])

  return (
    <canvas ref={canvasRef} aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ background: 'rgb(10 10 11)' }} />
  )
}
