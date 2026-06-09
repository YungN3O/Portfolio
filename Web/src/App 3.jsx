import { ThemeProvider } from './context/ThemeContext'
import { BackgroundProvider } from './context/BackgroundContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'

export default function App() {
  return (
    <ThemeProvider>
      <BackgroundProvider>
        <div className="min-h-screen text-body">
          <AnimatedBackground />
          <div className="pointer-events-none fixed inset-0 bg-bg/60" style={{ zIndex: -9 }} />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </BackgroundProvider>
    </ThemeProvider>
  )
}
