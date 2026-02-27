import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, where, getDocs, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { formatPrice } from '@/data/properties'
import type { Property } from '@/data/properties'
import PropertyCard from '@/components/ui/PropertyCard'

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(
          collection(db, 'imoveis'),
          where('featured', '==', true),
          limit(6)
        )
        const snapshot = await getDocs(q)
        
        const fetchedProps: Property[] = []
        snapshot.forEach((doc) => {
          fetchedProps.push({ id: doc.id, ...doc.data() } as Property)
        })
        
        setProperties(fetchedProps)
      } catch (error) {
        console.error("Erro ao buscar imóveis em destaque:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  return (
    <section id="imoveis" className="relative py-24 lg:py-32">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-bg-section to-bg-dark" />

      <div className="relative max-w-7xl mx-auto px-6">
        <span className="block text-text-secondary text-sm font-medium tracking-widest uppercase text-center mb-4">
          Portfólio
        </span>
        <h2 className="section-title">
          Imóveis em <span className="text-primary">Destaque</span>
        </h2>
        <div className="gold-divider mb-4" />
        <p className="section-subtitle">
          Selecionamos os melhores imóveis de Campinas e região para você.
        </p>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <PropertyCard
                key={prop.id}
                image={prop.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'}
                price={formatPrice(prop.price, prop.purpose)}
                location={`${prop.neighborhood}, ${prop.city} - ${prop.state}`}
                title={prop.title}
                bedrooms={prop.bedrooms}
                area={`${prop.area} m²`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-text-muted">
            <p>Nenhum imóvel em destaque encontrado no momento.</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-14">
          <Link to="/imoveis" className="btn-secondary">
            Ver Todos os Imóveis
          </Link>
        </div>
      </div>
    </section>
  )
}
