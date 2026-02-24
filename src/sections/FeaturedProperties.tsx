import { Link } from 'react-router-dom'
import PropertyCard from '@/components/ui/PropertyCard'

const properties = [
  {
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    price: 'R$ 1.250.000',
    location: 'Cambuí, Campinas - SP',
    title: 'Apartamento de Alto Padrão',
    bedrooms: 3,
    area: '145 m²',
  },
  {
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    price: 'R$ 2.800.000',
    location: 'Alphaville, Campinas - SP',
    title: 'Casa em Condomínio Fechado',
    bedrooms: 4,
    area: '320 m²',
  },
  {
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    price: 'R$ 980.000',
    location: 'Taquaral, Campinas - SP',
    title: 'Cobertura Duplex Exclusiva',
    bedrooms: 3,
    area: '200 m²',
  },
]

export default function FeaturedProperties() {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop) => (
            <PropertyCard key={prop.title} {...prop} />
          ))}
        </div>

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
