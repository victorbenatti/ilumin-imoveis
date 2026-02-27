import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/admin/imoveis')
    } catch (err: any) {
      setError('Falha no login. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <Link 
        to="/" 
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm font-medium bg-bg-section/50 hover:bg-bg-section px-4 py-2 rounded-full border border-border/50 hover:border-border"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao início
      </Link>
      <div className="max-w-md w-full space-y-8 bg-bg-section p-8 rounded-2xl border border-border">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/logoIluminImoveisSVG-Branca.svg"
            alt="Ilumin Imóveis"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-text-primary">
            Acesso Restrito
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-md text-sm text-center">
              {error}
            </div>
          )}
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-border px-4 py-2.5 bg-bg-dark text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted/50"
                placeholder="Email admin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-border px-4 py-2.5 bg-bg-dark text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted/50"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-lg bg-primary px-3 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar no painel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
