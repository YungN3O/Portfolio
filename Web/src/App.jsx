import { Component } from 'react'
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

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', background: '#c00', color: '#fff', padding: '2rem', fontFamily: 'monospace' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Render Error</h1>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', opacity: 0.9 }}>
            {String(this.state.error)}
            {'\n\n'}
            {this.state.error?.stack ?? ''}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BackgroundProvider>
          <div className="min-h-screen text-body">
            <AnimatedBackground />
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-bg/55" style={{ zIndex: -5 }} />
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
    </ErrorBoundary>
  )
}
