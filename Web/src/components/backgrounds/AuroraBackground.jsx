import { useEffect, useRef } from 'react'
import { useTheme, THEMES } from '../../context/ThemeContext'

function hexToRgb(hex) {
  return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)]
}

const RIBBONS = [
  { yFrac: 0.18, amp: 0.08, freq: 0.0018, speed: 0.00022, alpha: 0.40, widthFrac: 0.16, phase: 0.0 },
  { yFrac: 0.30, amp: 0.06, freq: 0.0022, speed: 0.00016, alpha: 0.32, widthFrac: 0.12, phase: 2.1 },
  { yFrac: 0.10, amp: 0.05, freq: 0.0015, speed: 0.00028, alpha: 0.28, widthFrac: 0.10, phase: 4.5 },
  { yFrac: 0.40, amp: 0.04, freq: 0.0026, speed: 0.00019, alpha: 0.24, widthFrac: 0.09, phase: 1.3 },
  { yFrac: 0.22, amp: 0.07, freq: 0.0012, speed: 0.00020, alpha: 0.20, widthFrac: 0.11, phase: 3.7 },
]

export default function AuroraBackground() {
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

    let start = null
    function draw(ts) {
      if (!start) start = ts
      const t = ts - start
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)

      RIBBONS.forEach((rb, i) => {
        const y = H * rb.yFrac
        const amp = H * rb.amp
        const width = H * rb.widthFrac
        const steps = 150

        ctx.beginPath()
        for (let j = 0; j <= steps; j++) {
          const x = (j / steps) * W
          const yOff =
            Math.sin(j * rb.freq * W + t * rb.speed + rb.phase) * amp +
            Math.sin(j * rb.freq * W * 0.45 + t * rb.speed * 1.8 + rb.phase + 0.9) * amp * 0.35
          if (j === 0) ctx.moveTo(x, y + yOff)
          else ctx.lineTo(x, y + yOff)
        }
        for (let j = steps; j >= 0; j--) {
          const x = (j / steps) * W
          const yOff =
            Math.sin(j * rb.freq * W + t * rb.speed + rb.phase + 1.1) * amp * 0.55 +
            Math.sin(j * rb.freq * W * 0.35 + t * rb.speed * 1.4 + rb.phase + 0.4) * amp * 0.25
          ctx.lineTo(x, y + yOff + width)
        }
        ctx.closePath()

        const [ra,ga,ba] = i % 2 === 0 ? [r1,g1,b1] : [r2,g2,b2]
        const [rb3,gb3,bb3] = i % 2 === 0 ? [r2,g2,b2] : [r1,g1,b1]
        const grad = ctx.createLinearGradient(0, 0, W, 0)
        grad.addColorStop(0,    `rgba(${ra},${ga},${ba},0)`)
        grad.addColorStop(0.15, `rgba(${ra},${ga},${ba},${rb.alpha})`)
        grad.addColorStop(0.5,  `rgba(${rb3},${gb3},${bb3},${rb.alpha * 1.2})`)
        grad.addColorStop(0.85, `rgba(${ra},${ga},${ba},${rb.alpha})`)
        grad.addColorStop(1,    `rgba(${ra},${ga},${ba},0)`)
        ctx.fillStyle = grad
        ctx.fill()
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
