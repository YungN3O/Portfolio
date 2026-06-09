import { HiSparkles, HiColorSwatch, HiCode, HiPhotograph } from 'react-icons/hi'
import { BG_OPTIONS, useBackground } from '../context/BackgroundContext'

const ICONS = {
  mesh:     HiColorSwatch,
  aurora:   HiSparkles,
  bokeh:    HiPhotograph,
  coderain: HiCode,
}

export default function BackgroundSwitcher() {
  const { bg, setBg } = useBackground()

  return (
    <div className="flex items-center gap-0.5" aria-label="Background switcher">
      {BG_OPTIONS.map(({ id, label }) => {
        const Icon = ICONS[id]
        return (
          <button
            key={id}
            onClick={() => setBg(id)}
            title={label}
            aria-label={`${label} background`}
            className={`rounded-lg p-1.5 transition-colors duration-150 ${
              bg === id
                ? 'bg-accent/20 text-accent'
                : 'text-muted hover:text-body'
            }`}
          >
            <Icon size={15} />
          </button>
        )
      })}
    </div>
  )
}
