import { useEffect, useRef } from 'react'
import { useTheme, THEMES } from '../../context/ThemeContext'

function hexToRgb(hex) {
  return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)]
}

// Swift + general programming symbols
const POOL = 'letvarfuncclassstructenumprotocolextensionoverridereturnselfguardifelseforinopaquewheretruefalsenil{}()[]<>:=!?@.->/|&+01'
  .split('')

const FS = 13         // font size px
const CW = 18         // column width px

function makeCol(x, H) {
  return {
    x,
    y: -Math.random() * H * 1.2,
    speed: 0.9 + Math.random() * 2.2,
    len: 10 + Math.floor(Math.random() * 20),
    chars: Array.from({ length: 32 }, () => POOL[Math.floor(Math.random() * POOL.length)]),
  }
}

export default function CodeRainBackground() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let cols = []

    const [r,g,b] = hexToRgb(THEMES[theme].from)

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const count = Math.ceil(canvas.width / CW)
      cols = Array.from({ length: count }, (_, i) => makeCol(i * CW + 4, canvas.height))
    }
    resize()
    window.addEventListener('resize', resize)

    let lastMutate = 0

    function draw(ts) {
      const W = canvas.width
      const H = canvas.height

      // Semi-transparent fill for trail fade
      ctx.fillStyle = 'rgba(10,10,11,0.16)'
      ctx.fillRect(0, 0, W, H)

      ctx.font = `${FS}px "SF Mono","Fira Code","Fira Mono",monospace`

      // Mutate random characters each tick for flicker
      if (ts - lastMutate > 70) {
        lastMutate = ts
        for (const col of cols) {
          if (Math.random() < 0.4) {
            const idx = Math.floor(Math.random() * col.chars.length)
            col.chars[idx] = POOL[Math.floor(Math.random() * POOL.length)]
          }
        }
      }

      for (const col of cols) {
        col.y += col.speed

        for (let i = 0; i < col.len; i++) {
          const cy = col.y - i * FS
          if (cy < -FS || cy > H + FS) continue

          const ch = col.chars[i % col.chars.length]

          if (i === 0) {
            // Head — bright white with glow
            ctx.shadowColor = `rgba(${r},${g},${b},1)`
            ctx.shadowBlur = 8
            ctx.fillStyle = 'rgba(255,255,255,0.95)'
          } else {
            ctx.shadowBlur = 0
            const alpha = Math.max(0, (1 - i / col.len) * 0.6)
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
          }

          ctx.fillText(ch, col.x, cy)
        }

        // Reset column when it scrolls fully past the bottom
        if (col.y - col.len * FS > H) {
          col.y = -Math.random() * H * 0.6
          col.speed = 0.9 + Math.random() * 2.2
          col.len = 10 + Math.floor(Math.random() * 20)
        }
      }

      ctx.shadowBlur = 0
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
