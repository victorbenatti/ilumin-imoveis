import Masonry from '@/components/Masonry'

const galleryItems = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    height: 500,
    url: '#imoveis',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    height: 650,
    url: '#imoveis',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    height: 550,
    url: '#imoveis',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
    height: 600,
    url: '#imoveis',
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
    height: 480,
    url: '#imoveis',
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    height: 700,
    url: '#imoveis',
  },
  {
    id: 7,
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
    height: 520,
    url: '#imoveis',
  },
  {
    id: 8,
    img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80',
    height: 580,
    url: '#imoveis',
  },
  {
    id: 9,
    img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80',
    height: 640,
    url: '#imoveis',
  },
  {
    id: 10,
    img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80',
    height: 530,
    url: '#imoveis',
  },
]

export default function Gallery() {
  return (
    <section id="galeria" className="gallery-section">
      {/* Top gradient transition from Hero */}
      <div className="gallery-top-fade" />

      <div className="gallery-container">
        {/* Section header */}
        <div className="gallery-header">
          <span className="gallery-label">Galeria</span>
          <h2 className="section-title">
            Imóveis que <span>inspiram</span>
          </h2>
          <p className="section-subtitle">
            Uma seleção exclusiva de propriedades que combinam sofisticação,
            conforto e localização privilegiada.
          </p>
          <div className="gold-divider" />
        </div>

        {/* Masonry grid */}
        <div className="gallery-masonry-wrapper">
          <Masonry
            items={galleryItems}
            ease="power3.out"
            duration={0.6}
            stagger={0.06}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.96}
            blurToFocus={true}
          />
        </div>
      </div>

      {/* Bottom gradient transition */}
      <div className="gallery-bottom-fade" />
    </section>
  )
}
