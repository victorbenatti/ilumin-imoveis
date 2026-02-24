import { useState } from 'react'
import { Send, MessageCircle, Mail, Phone, User, FileText, CheckCircle } from 'lucide-react'

const subjects = [
  'Quero comprar um imóvel',
  'Quero vender meu imóvel',
  'Quero alugar um imóvel',
  'Quero anunciar meu imóvel',
  'Avaliação de imóvel',
  'Dúvidas gerais',
  'Outro assunto',
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    subject: '',
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Futuramente: enviar para Firebase / API
    console.log('Form data:', formData)
    setSubmitted(true)

    setTimeout(() => {
      setSubmitted(false)
      setFormData({ subject: '', name: '', phone: '', email: '', message: '' })
    }, 5000)
  }

  return (
    <section id="contato" className="contact-section">
      {/* Background decoration */}
      <div className="contact-glow" />

      <div className="contact-container">
        {/* Left column — info */}
        <div className="contact-info">
          <span className="contact-label">Contato</span>
          <h2 className="section-title" style={{ textAlign: 'left' }}>
            Fale com a <span className="text-primary">nossa equipe</span>
          </h2>
          <div className="gold-divider" style={{ margin: '1rem 0' }} />
          <p className="contact-info-text">
            Preencha o formulário ao lado ou entre em contato diretamente
            através dos nossos canais. Nossa equipe retornará o mais breve possível.
          </p>

          <div className="contact-channels">
            <a
              href="https://wa.me/5519974113885"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel"
            >
              <div className="contact-channel-icon">
                <MessageCircle size={20} />
              </div>
              <div>
                <span className="contact-channel-title">WhatsApp</span>
                <span className="contact-channel-value">(19) 97411-3885</span>
              </div>
            </a>

            <a href="mailto:contato@iluminimoveis.com.br" className="contact-channel">
              <div className="contact-channel-icon">
                <Mail size={20} />
              </div>
              <div>
                <span className="contact-channel-title">E-mail</span>
                <span className="contact-channel-value">contato@iluminimoveis.com.br</span>
              </div>
            </a>

            <div className="contact-channel">
              <div className="contact-channel-icon">
                <Phone size={20} />
              </div>
              <div>
                <span className="contact-channel-title">Telefone</span>
                <span className="contact-channel-value">(19) 97411-3885</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column — form */}
        <div className="contact-form-wrap">
          {submitted ? (
            <div className="contact-success">
              <div className="contact-success-icon">
                <CheckCircle size={48} />
              </div>
              <h3>Mensagem enviada!</h3>
              <p>Nossa equipe entrará em contato em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form" id="contact-form">
              {/* Subject */}
              <div className="contact-field">
                <label htmlFor="contact-subject" className="contact-field-label">
                  <FileText size={14} />
                  Assunto
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="contact-input contact-select"
                  required
                >
                  <option value="" disabled>
                    Selecione o assunto...
                  </option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div className="contact-field">
                <label htmlFor="contact-name" className="contact-field-label">
                  <User size={14} />
                  Nome completo
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  className="contact-input"
                  required
                />
              </div>

              {/* Phone & Email row */}
              <div className="contact-field-row">
                <div className="contact-field">
                  <label htmlFor="contact-phone" className="contact-field-label">
                    <Phone size={14} />
                    Telefone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="contact-input"
                    required
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email" className="contact-field-label">
                    <Mail size={14} />
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="contact-input"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="contact-field">
                <label htmlFor="contact-message" className="contact-field-label">
                  <MessageCircle size={14} />
                  Mensagem
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Conte-nos como podemos ajudá-lo..."
                  value={formData.message}
                  onChange={handleChange}
                  className="contact-input contact-textarea"
                  rows={4}
                  required
                />
              </div>

              {/* Submit */}
              <button type="submit" className="contact-submit" id="contact-submit-btn">
                <Send size={18} />
                Enviar Mensagem
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
