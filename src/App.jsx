import { useState } from 'react'
import SmoothScroll from '@/components/ui/SmoothScroll'
import Preloader from '@/components/ui/Preloader'
import CustomCursor from '@/components/ui/CustomCursor'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import Process from '@/components/sections/Process'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

const PRELOAD_KEY = 'rb-preloaded'

function hasPreloaded() {
  try {
    return sessionStorage.getItem(PRELOAD_KEY) === '1'
  } catch {
    return false
  }
}

export default function App() {
  // Show the intro once per browser session, then go straight to the page.
  const [skipIntro] = useState(hasPreloaded)
  const [ready, setReady] = useState(skipIntro)
  const [introDone, setIntroDone] = useState(skipIntro)

  const onReveal = () => {
    try {
      sessionStorage.setItem(PRELOAD_KEY, '1')
    } catch {
      /* private mode etc. */
    }
    setReady(true)
  }

  return (
    <SmoothScroll>
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
      {!introDone && <Preloader onReveal={onReveal} onDone={() => setIntroDone(true)} />}

      <div className="bg-base text-text-primary min-h-screen">
        <Navbar />
        <main>
          <Hero ready={ready} />
          <Projects />
          <Services />
          <About />
          <Process />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}
