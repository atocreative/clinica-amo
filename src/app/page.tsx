import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import PersonalBrandSection from '@/components/PersonalBrandSection'
import BenefitsSection from '@/components/BenefitsSection'
import CinematicCTA from '@/components/CinematicCTA'
import BeforeAfterSection from '@/components/BeforeAfterSection'
import SuccessCasesSection from '@/components/SuccessCasesSection'
import CTASection from '@/components/CTASection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import ScrollProgress from '@/components/ScrollProgress'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <PersonalBrandSection />
        <BenefitsSection />
        <CinematicCTA />
        <BeforeAfterSection />
        <SuccessCasesSection />
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
