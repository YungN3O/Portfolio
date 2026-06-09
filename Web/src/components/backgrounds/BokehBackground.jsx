import { useEffect, useRef } from 'react'
import { useTheme, THEMES } from '../../context/ThemeContext'

function hexToRgb(hex) {
  return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)]
}

const COUNT = 80

export default function BokehBackground() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    const [r1,g1,b1] = hexToRgb(THEMES[theme].from)
    const [r2,g2,b2] = hexToRgb(THEMES[theme].to)

    function resize() {
      const newW = window.innerWidth
      if (canvas.width === newW) return
      canvas.width = newW
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function makeParticle(initial) {
      const W = canvas.width
      const H = canvas.height
      const depth = Math.random()         // 0=far/small, 1=near/large
      const t = Math.random()
      return {
        x: Math.random() * W,
        y: initial ? Math.random() * H : H + 60,
        depth,
        radius: 2 + depth * 38,
        speed: 0.07 + depth * 0.22,
        drift: (Math.random() - 0.5) * 0.18,
        opacity: 0.05 + depth * 0.38,
        blur: depth * 22,
        r: Math.round(r1 + (r2 - r1) * t),
        g: Math.round(g1 + (g2 - g1) * t),
        b: Math.round(b1 + (b2 - b1) * t),
      }
    }

    const particles = Array.from({ length: COUNT }, () => makeParticle(true))

    function draw() {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // draw back-to-front so large blurry ones appear behind
      const sorted = [...particles].sort((a, b) => a.depth - b.depth)
      for (const p of sorted) {
        p.y -= p.speed
        p.x += p.drift
        if (p.y < -p.radius * 3) Object.assign(p, makeParticle(false))

        ctx.save()
        ctx.shadowColor = `rgba(${p.r},${p.g},${p.b},0.85)`
        ctx.shadowBlur = p.blur * 5

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius)
        grad.addColorStop(0.0, `rgba(${p.r},${p.g},${p.b},${p.opacity})`)
        grad.addColorStop(0.5, `rgba(${p.r},${p.g},${p.b},${p.opacity * 0.5})`)
        grad.addColorStop(1.0, `rgba(${p.r},${p.g},${p.b},0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

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
