import { createContext, useContext, useState, useEffect } from 'react'

export const THEMES = {
  amber: {
    label: 'Amber',
    from: '#f59e0b',
    to: '#fb923c',
    vars: {
      '--accent': '245 158 11',
      '--accent-2': '251 146 60',
    },
  },
  indigo: {
    label: 'Indigo',
    from: '#6366f1',
    to: '#8b5cf6',
    vars: {
      '--accent': '99 102 241',
      '--accent-2': '139 92 246',
    },
  },
  blue: {
    label: 'Blue',
    from: '#1c77ff',
    to: '#00c9ff',
    vars: {
      '--accent': '28 119 255',
      '--accent-2': '0 201 255',
    },
  },
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('blue')

  useEffect(() => {
    const root = document.documentElement
    Object.entries(THEMES[theme].vars).forEach(([key, val]) => {
      root.style.setProperty(key, val)
    })
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
