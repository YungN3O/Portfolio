import { useBackground } from '../context/BackgroundContext'
import AuroraBackground   from './backgrounds/AuroraBackground'
import BokehBackground    from './backgrounds/BokehBackground'
import MeshBackground     from './backgrounds/MeshBackground'
import CodeRainBackground from './backgrounds/CodeRainBackground'

export default function AnimatedBackground() {
  const { bg } = useBackground()
  switch (bg) {
    case 'aurora':   return <AuroraBackground />
    case 'bokeh':    return <BokehBackground />
    case 'coderain': return <CodeRainBackground />
    default:         return <MeshBackground />
  }
}
