import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/sections/Hero'
import Gallery from '@/sections/Gallery'
import Institutional from '@/sections/Institutional'
import FeaturedProperties from '@/sections/FeaturedProperties'
import Differentials from '@/sections/Differentials'
import ContactForm from '@/sections/ContactForm'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg-dark">
      <Header />
      <main>
        <Hero />
        <FeaturedProperties />
        <Gallery />
        <Institutional />
        <Differentials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
