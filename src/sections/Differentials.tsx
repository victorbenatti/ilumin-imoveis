import { UserCheck, Eye, Zap, Home } from 'lucide-react'

const items = [
  {
    icon: UserCheck,
    title: 'Atendimento Personalizado',
    description:
      'Cada cliente recebe atenção exclusiva. Entendemos suas necessidades e encontramos as melhores opções.',
  },
  {
    icon: Eye,
    title: 'Transparência',
    description:
      'Clareza em cada etapa do processo. Você sabe exatamente o que está acontecendo em cada momento.',
  },
  {
    icon: Zap,
    title: 'Agilidade',
    description:
      'Processos otimizados para que você conquiste seu imóvel no menor tempo possível.',
  },
  {
    icon: Home,
    title: 'Imóveis Selecionados',
    description:
      'Curadoria rigorosa para oferecer apenas imóveis que atendam aos mais altos padrões de qualidade.',
  },
]

export default function Differentials() {
  return (
    <section id="diferenciais" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <span className="block text-text-secondary text-sm font-medium tracking-widest uppercase text-center mb-4">
          Por que nos escolher
        </span>
        <h2 className="section-title">
          Nossos <span className="text-primary">Diferenciais</span>
        </h2>
        <div className="gold-divider mb-4" />
        <p className="section-subtitle">
          O que faz a Ilumin Imóveis ser a escolha certa para sua jornada imobiliária.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <div
              key={item.title}
              className="group text-center p-8 rounded-xl bg-bg-card/50 border border-border hover:border-border-gold transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                <item.icon size={28} className="text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
