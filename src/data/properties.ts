// Estrutura dos dados de imóveis — mesma que será usada no Firebase Firestore
export interface Property {
    id: string
    title: string
    description: string
    price: number
    location: string
    neighborhood: string
    city: string
    state: string
    type: 'apartamento' | 'casa' | 'cobertura' | 'terreno' | 'comercial'
    purpose: 'venda' | 'aluguel'
    bedrooms: number
    bathrooms: number
    parkingSpaces: number
    area: number // m²
    images: string[]
    featured: boolean
    createdAt: string
}

// Mock data — será substituído pelo Firebase Firestore futuramente
export const mockProperties: Property[] = [
    {
        id: '1',
        title: 'Apartamento de Alto Padrão no Cambuí',
        description:
            'Lindo apartamento com acabamento premium, varanda gourmet e vista deslumbrante. Localizado no coração do Cambuí, próximo a restaurantes e comércios.',
        price: 1250000,
        location: 'Rua Dr. Quirino, 1200',
        neighborhood: 'Cambuí',
        city: 'Campinas',
        state: 'SP',
        type: 'apartamento',
        purpose: 'venda',
        bedrooms: 3,
        bathrooms: 2,
        parkingSpaces: 2,
        area: 145,
        images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
        ],
        featured: true,
        createdAt: '2026-02-01',
    },
    {
        id: '2',
        title: 'Casa em Condomínio Fechado',
        description:
            'Ampla casa com 4 suítes, piscina, churrasqueira e área de lazer completa. Condomínio com segurança 24h e infraestrutura de clube.',
        price: 2800000,
        location: 'Av. Albino J. B. de Oliveira, 2500',
        neighborhood: 'Alphaville',
        city: 'Campinas',
        state: 'SP',
        type: 'casa',
        purpose: 'venda',
        bedrooms: 4,
        bathrooms: 4,
        parkingSpaces: 3,
        area: 320,
        images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        ],
        featured: true,
        createdAt: '2026-01-28',
    },
    {
        id: '3',
        title: 'Cobertura Duplex Exclusiva',
        description:
            'Cobertura duplex com terraço panorâmico, jacuzzi e acabamento de primeira. Vista privilegiada para a Lagoa do Taquaral.',
        price: 980000,
        location: 'Av. Dr. Heitor Penteado, 800',
        neighborhood: 'Taquaral',
        city: 'Campinas',
        state: 'SP',
        type: 'cobertura',
        purpose: 'venda',
        bedrooms: 3,
        bathrooms: 3,
        parkingSpaces: 2,
        area: 200,
        images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
        ],
        featured: true,
        createdAt: '2026-01-25',
    },
    {
        id: '4',
        title: 'Apartamento Moderno no Guanabara',
        description:
            'Apartamento novo, nunca habitado, com 2 quartos, sala ampla, cozinha americana e varanda com churrasqueira.',
        price: 520000,
        location: 'Rua Antônio Cezarino, 450',
        neighborhood: 'Guanabara',
        city: 'Campinas',
        state: 'SP',
        type: 'apartamento',
        purpose: 'venda',
        bedrooms: 2,
        bathrooms: 1,
        parkingSpaces: 1,
        area: 72,
        images: [
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
        ],
        featured: false,
        createdAt: '2026-02-10',
    },
    {
        id: '5',
        title: 'Casa Térrea no Gramado',
        description:
            'Casa térrea com 3 quartos, quintal amplo e edícula. Bairro tranquilo, próximo a escolas e supermercados.',
        price: 680000,
        location: 'Rua das Palmeiras, 320',
        neighborhood: 'Gramado',
        city: 'Campinas',
        state: 'SP',
        type: 'casa',
        purpose: 'venda',
        bedrooms: 3,
        bathrooms: 2,
        parkingSpaces: 2,
        area: 180,
        images: [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
        ],
        featured: false,
        createdAt: '2026-02-05',
    },
    {
        id: '6',
        title: 'Studio para Aluguel — Centro',
        description:
            'Studio compacto e funcional, totalmente mobiliado, ideal para profissionais. Próximo ao Largo do Rosário.',
        price: 2200,
        location: 'Rua General Osório, 150',
        neighborhood: 'Centro',
        city: 'Campinas',
        state: 'SP',
        type: 'apartamento',
        purpose: 'aluguel',
        bedrooms: 1,
        bathrooms: 1,
        parkingSpaces: 0,
        area: 35,
        images: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
        ],
        featured: false,
        createdAt: '2026-02-12',
    },
    {
        id: '7',
        title: 'Sala Comercial no Galleria',
        description:
            'Sala comercial com 60m², ar-condicionado central, piso elevado e infraestrutura completa para escritório.',
        price: 3500,
        location: 'Rod. D. Pedro I, km 131',
        neighborhood: 'Galleria',
        city: 'Campinas',
        state: 'SP',
        type: 'comercial',
        purpose: 'aluguel',
        bedrooms: 0,
        bathrooms: 1,
        parkingSpaces: 1,
        area: 60,
        images: [
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
        ],
        featured: false,
        createdAt: '2026-02-08',
    },
    {
        id: '8',
        title: 'Terreno em Condomínio — Barão Geraldo',
        description:
            'Terreno de 450m² em condomínio novo com infraestrutura completa. Próximo à UNICAMP e ao distrito de Barão Geraldo.',
        price: 380000,
        location: 'Rua Carl von Linnaeus, 200',
        neighborhood: 'Barão Geraldo',
        city: 'Campinas',
        state: 'SP',
        type: 'terreno',
        purpose: 'venda',
        bedrooms: 0,
        bathrooms: 0,
        parkingSpaces: 0,
        area: 450,
        images: [
            'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80',
        ],
        featured: false,
        createdAt: '2026-02-15',
    },
    {
        id: '9',
        title: 'Apartamento Garden com Quintal',
        description:
            'Apartamento garden no térreo com quintal privativo de 40m². 3 quartos, 2 banheiros e vaga coberta.',
        price: 750000,
        location: 'Av. José de Souza Campos, 1800',
        neighborhood: 'Nova Campinas',
        city: 'Campinas',
        state: 'SP',
        type: 'apartamento',
        purpose: 'venda',
        bedrooms: 3,
        bathrooms: 2,
        parkingSpaces: 1,
        area: 110,
        images: [
            'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80',
        ],
        featured: false,
        createdAt: '2026-02-18',
    },
]

// Helpers para filtros
export const propertyTypes = [
    { value: '', label: 'Todos os tipos' },
    { value: 'apartamento', label: 'Apartamento' },
    { value: 'casa', label: 'Casa' },
    { value: 'cobertura', label: 'Cobertura' },
    { value: 'terreno', label: 'Terreno' },
    { value: 'comercial', label: 'Comercial' },
]

export const propertyPurposes = [
    { value: '', label: 'Comprar & Alugar' },
    { value: 'venda', label: 'Comprar' },
    { value: 'aluguel', label: 'Alugar' },
]

export const neighborhoods = [
    'Cambuí',
    'Alphaville',
    'Taquaral',
    'Guanabara',
    'Gramado',
    'Centro',
    'Galleria',
    'Barão Geraldo',
    'Nova Campinas',
]

export function formatPrice(price: number, purpose: string): string {
    const formatted = price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
    })
    return purpose === 'aluguel' ? `${formatted}/mês` : formatted
}
