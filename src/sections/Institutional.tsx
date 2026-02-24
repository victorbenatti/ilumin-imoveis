import { Award, Heart, Shield } from 'lucide-react'

const highlights = [
  {
    icon: Award,
    title: 'Experiência',
    text: 'Anos de atuação no mercado imobiliário de Campinas e região.',
  },
  {
    icon: Heart,
    title: 'Atendimento Personalizado',
    text: 'Cada cliente é único. Ouvimos suas necessidades e encontramos o imóvel ideal.',
  },
  {
    icon: Shield,
    title: 'Confiança',
    text: 'Transparência total em cada etapa da negociação.',
  },
]

export default function Institutional() {
  return (
    <section id="sobre" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Founder Photo */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
              <img
                src="/ft-mirella.jpeg"
                alt="Fundadora da Ilumin Imóveis"
                className="w-full h-[800px] object-cover object-top"
              />
              {/* Warm overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-transparent to-transparent" />
            </div>
            {/* Decorative border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/20 rounded-2xl -z-10" />
          </div>

          {/* Text Content */}
          <div>
            <span className="text-text-secondary text-sm font-medium tracking-widest uppercase mb-4 block">
              Quem Somos
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-6">
              Iluminando o caminho até o
              <span className="text-primary"> seu imóvel ideal</span>
            </h2>
            <div className="gold-divider !mx-0 mb-8" />
            <p className="text-text-muted leading-relaxed mb-6 text-lg">
              A <strong className="text-text-primary">Ilumin Imóveis</strong> nasceu do desejo de
              transformar a experiência imobiliária em algo leve, transparente e humano. Acreditamos
              que encontrar o imóvel perfeito é mais do que uma transação — é a realização de um sonho.
            </p>
            <p className="text-text-muted leading-relaxed mb-10">
              Com atendimento personalizado e profundo conhecimento do mercado de Campinas e região,
              guiamos cada cliente com clareza e dedicação, do primeiro contato até a entrega das chaves.
            </p>

            {/* Highlights */}
            <div className="space-y-5">
              {highlights.map((item) => (
                <div key={item.title} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-text-primary font-semibold mb-1">{item.title}</h4>
                    <p className="text-text-muted text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
