import { MessageCircle, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contato" className="relative bg-bg-warm border-t border-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/logoIluminImoveisSVG-Branca.svg"
                alt="Ilumin Imóveis"
                className="h-24 w-auto"
                draggable={false}
              />
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Iluminando o caminho até o imóvel dos seus sonhos. Atendimento humanizado e transparente
              no mercado imobiliário de Campinas.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-text-primary mb-5">Contato</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/5519999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors text-sm"
                >
                  <MessageCircle size={16} className="text-primary" />
                  (19) 99999-9999
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@iluminimoveis.com.br"
                  className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors text-sm"
                >
                  <Mail size={16} className="text-primary" />
                  contato@iluminimoveis.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Region */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-text-primary mb-5">
              Região de Atuação
            </h4>
            <ul className="space-y-3">
              {['Campinas', 'Valinhos', 'Vinhedo', 'Paulínia', 'Indaiatuba'].map((city) => (
                <li key={city} className="flex items-center gap-2 text-text-muted text-sm">
                  <MapPin size={14} className="text-text-secondary" />
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs">
            © {year} Ilumin Imóveis. Todos os direitos reservados.
          </p>
          <p className="text-text-muted/60 text-xs">CRECI-SP 000000-J</p>
        </div>
      </div>
    </footer>
  )
}
