import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import SmoothScroll from '@/components/ui/SmoothScroll'
import Preloader from '@/components/ui/Preloader'
import CustomCursor from '@/components/ui/CustomCursor'
import Galaxy from '@/components/galaxy/Galaxy'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Work from '@/components/sections/Work'
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

  // There is a lot more motion on the page now, so hand the whole tree the
  // reader's own reduced-motion setting rather than relying on CSS alone.
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <div className="grain" aria-hidden="true" />
        <CustomCursor />
        {!introDone && <Preloader onReveal={onReveal} onDone={() => setIntroDone(true)} />}

        <Galaxy />

        <div className="galaxy-content text-text-primary min-h-screen">
          <Navbar />
          <main>
            <Hero ready={ready} />
            <Work />
            <Services />
            <About />
            <Process />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </MotionConfig>
  )
}
