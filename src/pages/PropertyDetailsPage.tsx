import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { ChevronLeft, ChevronRight, MapPin, BedDouble, Bath, Car, Maximize, Loader2, ArrowLeft } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { formatPrice, type Property } from '@/data/properties'

export default function PropertyDetailsPage() {
  const { id } = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    async function fetchProperty() {
      if (!id) return
      
      try {
        const docRef = doc(db, 'imoveis', id)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() } as Property
          setProperty(data)
        } else {
          console.log("No such document!")
        }
      } catch (error) {
        console.error("Error fetching property:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-bg-dark">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center text-text-muted mt-20">
            <Loader2 size={48} className="animate-spin mb-4 text-primary" />
            <h3 className="text-xl">Preparando uma experiência incrível...</h3>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col bg-bg-dark">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-text-light mb-4">Imóvel não encontrado</h2>
            <Link to="/" className="text-primary hover:text-primary-hover flex items-center justify-center gap-2 text-lg">
              <ArrowLeft size={24} />
              Voltar para a busca
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['https://placehold.co/1200x800?text=Sem+Imagem']

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  const whatsappMessage = encodeURIComponent(`Olá! Tenho interesse no imóvel: ${property.title}`)
  const whatsappUrl = `https://wa.me/5519999999999?text=${whatsappMessage}`

  return (
    <div className="min-h-screen bg-bg-dark text-text-light selection:bg-primary/30">
      <Header />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center text-text-muted hover:text-primary mb-8 transition-colors font-medium">
            <ArrowLeft size={20} className="mr-2" />
            Voltar para os imóveis
          </Link>

          {/* Header Section */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${
                property.purpose === 'aluguel' ? 'bg-primary/20 text-primary' : 'bg-primary text-bg-dark'
              }`}>
                {property.purpose === 'aluguel' ? 'Aluguel' : 'Venda'}
              </span>
              <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-surface-light text-text-muted border border-border-dark uppercase tracking-wider">
                {property.type}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight">
              {property.title}
            </h1>
            
            <div className="flex items-center text-text-muted text-lg md:text-xl font-medium">
              <MapPin size={24} className="mr-2 text-primary" />
              {property.neighborhood}, {property.city} - {property.state}
            </div>
          </div>

          {/* Hero Gallery (Carousel) */}
          <div className="relative rounded-[2rem] overflow-hidden mb-6 bg-surface shadow-2xl border border-border-dark group">
            <div className="aspect-[4/3] md:aspect-[21/9] w-full relative">
              <img 
                key={currentIndex}
                src={images[currentIndex]} 
                alt={`Foto ${currentIndex + 1} do imóvel ${property.title}`} 
                className="w-full h-full object-cover animate-in fade-in duration-500 ease-in-out"
              />
              
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage} 
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-bg-dark/60 hover:bg-primary text-white p-4 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-lg hover:scale-110"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button 
                    onClick={nextImage} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-bg-dark/60 hover:bg-primary text-white p-4 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-lg hover:scale-110"
                    aria-label="Próxima foto"
                  >
                    <ChevronRight size={28} />
                  </button>
                  <div className="absolute bottom-6 right-6 bg-bg-dark/80 backdrop-blur-md text-white px-5 py-2.5 rounded-full font-semibold tracking-wide border border-white/10 shadow-lg">
                    {currentIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4 mb-12 snap-x [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative flex-shrink-0 w-32 h-24 md:w-40 md:h-28 rounded-xl overflow-hidden snap-start transition-all duration-300 ${
                    currentIndex === idx 
                      ? 'ring-4 ring-primary ring-offset-4 ring-offset-bg-dark opacity-100 scale-100' 
                      : 'opacity-50 hover:opacity-100 scale-95 hover:scale-100'
                  }`}
                >
                  <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Left Column: Details & Description */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Characteristics Grid - Premium Look */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Visão Geral</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  <div className="bg-surface-light p-6 rounded-2xl border border-border flex flex-col items-center justify-center text-center gap-3 hover:border-primary/50 transition-colors">
                    <div className="bg-bg-dark p-3 rounded-full text-primary">
                      <BedDouble size={28} />
                    </div>
                    <div>
                      <span className="block text-3xl font-bold text-white mb-1">{property.bedrooms}</span>
                      <span className="text-xs text-text-muted uppercase tracking-widest font-semibold">Quartos</span>
                    </div>
                  </div>
                  
                  <div className="bg-surface-light p-6 rounded-2xl border border-border flex flex-col items-center justify-center text-center gap-3 hover:border-primary/50 transition-colors">
                    <div className="bg-bg-dark p-3 rounded-full text-primary">
                      <Bath size={28} />
                    </div>
                    <div>
                      <span className="block text-3xl font-bold text-white mb-1">{property.bathrooms}</span>
                      <span className="text-xs text-text-muted uppercase tracking-widest font-semibold">Banheiros</span>
                    </div>
                  </div>
                  
                  <div className="bg-surface-light p-6 rounded-2xl border border-border flex flex-col items-center justify-center text-center gap-3 hover:border-primary/50 transition-colors">
                    <div className="bg-bg-dark p-3 rounded-full text-primary">
                      <Car size={28} />
                    </div>
                    <div>
                      <span className="block text-3xl font-bold text-white mb-1">{property.parkingSpaces}</span>
                      <span className="text-xs text-text-muted uppercase tracking-widest font-semibold">Vagas</span>
                    </div>
                  </div>
                  
                  <div className="bg-surface-light p-6 rounded-2xl border border-border flex flex-col items-center justify-center text-center gap-3 hover:border-primary/50 transition-colors">
                    <div className="bg-bg-dark p-3 rounded-full text-primary">
                      <Maximize size={28} />
                    </div>
                    <div>
                      <span className="block text-3xl font-bold text-white mb-1">{property.area}</span>
                      <span className="text-xs text-text-muted uppercase tracking-widest font-semibold">m² Área</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-surface p-8 md:p-10 rounded-[2rem] border border-border">
                <h3 className="text-2xl font-bold text-white mb-6">Descrição do Imóvel</h3>
                <div className="text-lg text-text-muted leading-relaxed whitespace-pre-wrap">
                  {property.description}
                </div>
              </div>

            </div>

            {/* Right Column: CTA Static Card Aligned */}
            <div className="lg:col-span-1 h-full">
              <div className="bg-primary p-10 md:p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(234,179,8,0.2)] flex flex-col justify-between h-full min-h-[500px]">
                <div>
                  <span className="text-bg-dark/70 block mb-3 uppercase tracking-widest font-black text-sm">
                    Investimento
                  </span>
                  <div className="text-4xl md:text-5xl font-extrabold text-bg-dark mb-2 tracking-tighter break-words">
                    {formatPrice(property.price)}
                  </div>
                  {property.purpose === 'aluguel' && (
                    <span className="text-2xl text-bg-dark/80 font-medium block mt-2">/ mês</span>
                  )}
                </div>

                <div className="space-y-8 mt-12">
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-full flex items-center justify-center gap-4 bg-bg-dark text-primary hover:text-white font-bold text-2xl py-7 px-6 rounded-[1.5rem] transition-all hover:-translate-y-2 shadow-2xl overflow-hidden border border-bg-dark/10"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                      Agendar Visita
                    </span>
                    <div className="absolute inset-0 h-full w-full bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                  </a>
                  
                  <div className="flex items-center justify-center gap-3 text-sm text-bg-dark/80 font-bold uppercase tracking-wider">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-800 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-900"></span>
                    </span>
                    Corretores online agora
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
