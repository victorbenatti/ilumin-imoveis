import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, SlidersHorizontal, MapPin, BedDouble, Bath, Car, Maximize, ArrowRight, ChevronLeft, X } from 'lucide-react'
import {
  mockProperties,
  propertyTypes,
  propertyPurposes,
  formatPrice,
  type Property,
} from '@/data/properties'
import './ImoveisPage.css'

export default function ImoveisPage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [purpose, setPurpose] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minBedrooms, setMinBedrooms] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return mockProperties.filter((p: Property) => {
      // Search by title, neighborhood, or description
      if (search) {
        const s = search.toLowerCase()
        const matchesSearch =
          p.title.toLowerCase().includes(s) ||
          p.neighborhood.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s) ||
          p.city.toLowerCase().includes(s)
        if (!matchesSearch) return false
      }

      // Filter by type
      if (type && p.type !== type) return false

      // Filter by purpose
      if (purpose && p.purpose !== purpose) return false

      // Filter by min price
      if (minPrice && p.price < Number(minPrice)) return false

      // Filter by max price
      if (maxPrice && p.price > Number(maxPrice)) return false

      // Filter by bedrooms
      if (minBedrooms && p.bedrooms < Number(minBedrooms)) return false

      return true
    })
  }, [search, type, purpose, minPrice, maxPrice, minBedrooms])

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
    <div className="imoveis-page">
      {/* Hero banner */}
      <div className="imoveis-hero">
        <div className="imoveis-hero-overlay" />
        <div className="imoveis-hero-content">
          <Link to="/" className="imoveis-back-link">
            <ChevronLeft size={18} />
            Voltar ao Início
          </Link>
          <h1 className="imoveis-hero-title">
            Encontre o imóvel <span>ideal</span>
          </h1>
          <p className="imoveis-hero-subtitle">
            Explore nossa seleção completa de imóveis em Campinas e região
          </p>
        </div>
      </div>

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
        {filtered.length > 0 ? (
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
  )
}

// Property Card for the list page
function PropertyListCard({ property }: { property: Property }) {
  return (
    <div className="imovel-card" id={`property-${property.id}`}>
      {/* Image */}
      <div className="imovel-card-image-wrap">
        <img
          src={property.images[0]}
          alt={property.title}
          className="imovel-card-image"
          loading="lazy"
        />
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
          {formatPrice(property.price, property.purpose)}
        </div>
      </div>

      {/* Content */}
      <div className="imovel-card-content">
        <h3 className="imovel-card-title">{property.title}</h3>
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

        {/* CTA */}
        <a
          href={`https://wa.me/5519999999999?text=Olá! Tenho interesse no imóvel: ${property.title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="imovel-card-cta"
        >
          Tenho Interesse
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  )
}
