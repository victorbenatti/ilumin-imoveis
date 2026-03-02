import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, SlidersHorizontal, MapPin, BedDouble, Bath, Car, Maximize, Loader2, X, Eye } from 'lucide-react'
import { propertyTypes, propertyPurposes, formatPrice, type Property } from '@/data/properties'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

// Using existing CSS from ImoveisPage since it's highly customized
import '@/sections/PropertySearchSection.css'

export default function PropertySearchSection() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [purpose, setPurpose] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minBedrooms, setMinBedrooms] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    async function fetchProperties() {
      try {
        const q = query(collection(db, 'imoveis'), orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Property[]
        setProperties(docs)
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  const filtered = useMemo(() => {
    return properties.filter((p: Property) => {
      if (search) {
        const s = search.toLowerCase()
        const matchesSearch =
          p.title.toLowerCase().includes(s) ||
          p.neighborhood.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s) ||
          p.city.toLowerCase().includes(s)
        if (!matchesSearch) return false
      }

      if (type && p.type !== type) return false
      if (purpose && p.purpose !== purpose) return false
      if (minPrice && p.price < Number(minPrice)) return false
      if (maxPrice && p.price > Number(maxPrice)) return false
      if (minBedrooms && p.bedrooms < Number(minBedrooms)) return false

      return true
    })
  }, [properties, search, type, purpose, minPrice, maxPrice, minBedrooms])

  const activeFilterCount = [type, purpose, minPrice, maxPrice, minBedrooms].filter(Boolean).length

  const clearFilters = () => {
    setType('')
    setPurpose('')
    setMinPrice('')
    setMaxPrice('')
    setMinBedrooms('')
    setSearch('')
  }

  return (
    <section className="py-16 bg-bg-dark" id="buscar-imoveis">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-text-light mb-4">
            Encontre o imóvel <span className="text-primary">ideal</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Explore nossa seleção completa de imóveis com filtros avançados para achar exatamente o que você procura.
          </p>
        </div>

        <div className="imoveis-page" style={{ paddingTop: 0 }}>
          {/* Search & Filters Bar */}
          <div className="imoveis-controls">
            <div className="imoveis-controls-inner">
              {/* Search input */}
              <div className="imoveis-search-wrap">
                <Search size={18} className="imoveis-search-icon" />
                <input
                  type="text"
                  placeholder="Buscar por nome, bairro ou cidade..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="imoveis-search-input"
                  id="search-properties"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="imoveis-search-clear"
                    aria-label="Limpar busca"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Quick Filters (desktop) */}
              <div className="imoveis-quick-filters">
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="imoveis-select"
                  id="filter-purpose"
                >
                  {propertyPurposes.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="imoveis-select"
                  id="filter-type"
                >
                  {propertyTypes.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`imoveis-filter-toggle ${showFilters ? 'active' : ''}`}
                  id="toggle-advanced-filters"
                >
                  <SlidersHorizontal size={16} />
                  Filtros
                  {activeFilterCount > 0 && (
                    <span className="imoveis-filter-badge">{activeFilterCount}</span>
                  )}
                </button>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            <div className={`imoveis-advanced-filters ${showFilters ? 'open' : ''}`}>
              <div className="imoveis-advanced-filters-inner">
                <div className="imoveis-filter-group">
                  <label className="imoveis-filter-label">Preço Mínimo (R$)</label>
                  <input
                    type="number"
                    placeholder="Ex: 200000"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="imoveis-filter-input"
                    id="filter-min-price"
                  />
                </div>
                <div className="imoveis-filter-group">
                  <label className="imoveis-filter-label">Preço Máximo (R$)</label>
                  <input
                    type="number"
                    placeholder="Ex: 3000000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="imoveis-filter-input"
                    id="filter-max-price"
                  />
                </div>
                <div className="imoveis-filter-group">
                  <label className="imoveis-filter-label">Quartos (mín.)</label>
                  <select
                    value={minBedrooms}
                    onChange={(e) => setMinBedrooms(e.target.value)}
                    className="imoveis-select"
                    id="filter-bedrooms"
                  >
                    <option value="">Todos</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
                <div className="imoveis-filter-group imoveis-filter-actions">
                  <button onClick={clearFilters} className="imoveis-clear-btn">
                    Limpar Filtros
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="imoveis-results-bar">
            <span className="imoveis-results-count">
              <strong>{filtered.length}</strong> {filtered.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
            </span>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="imoveis-clear-all">
                Limpar todos os filtros
              </button>
            )}
          </div>

          {/* Properties Grid */}
          <div className="imoveis-grid-container">
            {loading ? (
              <div className="imoveis-empty">
                <Loader2 size={48} className="imoveis-empty-icon animate-spin" />
                <h3>Carregando imóveis...</h3>
              </div>
            ) : filtered.length > 0 ? (
              <div className="imoveis-grid">
                {filtered.map((property) => (
                  <PropertyListCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="imoveis-empty">
                <Search size={48} className="imoveis-empty-icon" />
                <h3>Nenhum imóvel encontrado</h3>
                <p>Tente ajustar seus filtros de busca</p>
                <button onClick={clearFilters} className="btn-primary">
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

// Property Card for the list
function PropertyListCard({ property }: { property: Property }) {
  return (
    <div className="imovel-card" id={`property-${property.id}`}>
      {/* Image */}
      <div className="imovel-card-image-wrap">
        <Link to={`/imovel/${property.id}`} className="block w-full h-full">
          <img
            src={property.images?.[0] || 'https://placehold.co/600x400?text=Sem+Imagem'}
            alt={property.title}
            className="imovel-card-image transition-transform hover:scale-105 duration-500"
            loading="lazy"
          />
        </Link>
        {/* Badges */}
        <div className="imovel-card-badges">
          <span className={`imovel-badge ${property.purpose === 'aluguel' ? 'badge-rent' : 'badge-sale'}`}>
            {property.purpose === 'aluguel' ? 'Aluguel' : 'Venda'}
          </span>
          <span className="imovel-badge badge-type">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
        </div>
        {/* Price overlay */}
        <div className="imovel-card-price">
          {formatPrice(property.price)}
          {property.purpose === 'aluguel' ? <span className="text-sm font-normal">/mês</span> : ''}
        </div>
      </div>

      {/* Content */}
      <div className="imovel-card-content">
        <Link to={`/imovel/${property.id}`}>
          <h3 className="imovel-card-title hover:text-primary transition-colors">{property.title}</h3>
        </Link>
        <div className="imovel-card-location">
          <MapPin size={14} />
          {property.neighborhood}, {property.city} - {property.state}
        </div>

        <p className="imovel-card-desc">{property.description}</p>

        {/* Details grid */}
        <div className="imovel-card-details">
          {property.bedrooms > 0 && (
            <div className="imovel-detail">
              <BedDouble size={16} />
              <span>{property.bedrooms} {property.bedrooms === 1 ? 'quarto' : 'quartos'}</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="imovel-detail">
              <Bath size={16} />
              <span>{property.bathrooms} {property.bathrooms === 1 ? 'banheiro' : 'banheiros'}</span>
            </div>
          )}
          {property.parkingSpaces > 0 && (
            <div className="imovel-detail">
              <Car size={16} />
              <span>{property.parkingSpaces} {property.parkingSpaces === 1 ? 'vaga' : 'vagas'}</span>
            </div>
          )}
          <div className="imovel-detail">
            <Maximize size={16} />
            <span>{property.area} m²</span>
          </div>
        </div>

        {/* CTA updated to Route Link */}
        <Link
          to={`/imovel/${property.id}`}
          className="imovel-card-cta justify-center"
        >
          <Eye size={18} className="mr-2" />
          Ver Detalhes
        </Link>
      </div>
    </div>
  )
}
