import { ArrowRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import ShinyText from '@/components/ShinyText'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80)',
        }}
      />

      {/* Warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#1A1008]/80 to-bg-dark" />

      {/* Golden light glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/8 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="inline-flex items-center mb-8 animate-fade-in">
          <img
            src="/logoIluminImoveisSVG-Branca.svg"
            alt="Ilumin Imóveis"
            className="h-60 w-auto"
            draggable={false}
          />
        </div>

        {/* Headline */}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          <ShinyText
            text="Especialista no mercado imobiliário"
            color="#F5EDE0"
            shineColor="#E8B84D"
            speed={4}
            spread={120}
            className="font-heading"
          />
          <br />
          <ShinyText
            text="Campinas e região"
            color="#D4A854"
            shineColor="#FFFFFF"
            speed={4}
            delay={0.5}
            spread={120}
            className="font-heading"
          />
        </h1>

        {/* Subheadline */}
        <p className="text-text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Conectando pessoas a imóveis exclusivos com atendimento personalizado, transparência e dedicação.
        </p>

        {/* Divider */}
        <div className="gold-divider mb-10" />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/imoveis" className="btn-primary text-base">
            Ver Imóveis
            <ArrowRight size={18} />
          </Link>
          <a
            href="https://wa.me/5519999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-base"
          >
            <MessageCircle size={18} />
            Falar no WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-dark to-transparent" />
    </section>
  )
}
