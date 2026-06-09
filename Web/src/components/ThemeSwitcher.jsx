import { useTheme, THEMES } from '../context/ThemeContext'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2" aria-label="Color theme switcher">
      {Object.entries(THEMES).map(([id, t]) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          title={t.label}
          aria-label={`Switch to ${t.label} theme`}
          className={`h-[18px] w-[18px] rounded-full transition-all duration-200 hover:scale-110 ${
            theme === id
              ? 'scale-110 ring-2 ring-white/70 ring-offset-2 ring-offset-bg'
              : 'opacity-60 hover:opacity-100'
          }`}
          style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}
        />
      ))}
    </div>
  )
}
