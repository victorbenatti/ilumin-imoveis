import { MapPin, ArrowRight } from 'lucide-react'

interface PropertyCardProps {
  image: string
  price: string
  location: string
  title: string
  bedrooms: number
  area: string
}

export default function PropertyCard({
  image,
  price,
  location,
  title,
  bedrooms,
  area,
}: PropertyCardProps) {
  return (
    <div className="group bg-bg-card rounded-xl overflow-hidden border border-border hover:border-border-gold transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Price badge */}
        <div className="absolute top-4 left-4 bg-bg-dark/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-border-gold">
          <span className="text-primary font-heading font-bold text-lg">{price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-text-primary font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-1.5 text-text-muted text-sm mb-4">
          <MapPin size={14} className="text-text-secondary" />
          {location}
        </div>

        {/* Details */}
        <div className="flex items-center gap-4 text-text-muted text-xs mb-5 pb-5 border-b border-border">
          <span>{bedrooms} quartos</span>
          <span className="w-1 h-1 rounded-full bg-text-muted" />
          <span>{area}</span>
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:text-accent transition-colors group/btn"
        >
          Ver Detalhes
          <ArrowRight
            size={16}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </a>
      </div>
    </div>
  )
}
