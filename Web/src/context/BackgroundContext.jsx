import { createContext, useContext, useState } from 'react'

export const BG_OPTIONS = [
  { id: 'mesh',     label: 'Mesh' },
  { id: 'aurora',   label: 'Aurora' },
  { id: 'bokeh',    label: 'Bokeh' },
  { id: 'coderain', label: 'Code' },
]

const BackgroundContext = createContext(null)

export function BackgroundProvider({ children }) {
  const [bg, setBg] = useState('mesh')
  return (
    <BackgroundContext.Provider value={{ bg, setBg }}>
      {children}
    </BackgroundContext.Provider>
  )
}

export function useBackground() {
  return useContext(BackgroundContext)
}
