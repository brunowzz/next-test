import { Faq } from './components/faq'
import { Features } from './components/features'
import { Hero } from './components/hero'
import { Pricing } from './components/pricing'
import { Productivity } from './components/productivy'

export default function LandingPage() {
    return (
        <main>
            <Hero />
            <Features />
            <Pricing />
            <Faq />
            <Productivity />
        </main>
    )
}
