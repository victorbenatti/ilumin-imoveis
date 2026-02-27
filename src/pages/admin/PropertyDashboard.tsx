import { useState, useEffect } from 'react'
import { Building2, Edit2, Plus, Trash2, Search, ArrowRight, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice, type Property } from '@/data/properties'
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase' // Ajuste se o caminho do seu firebase.ts for diferente

export default function PropertyDashboard() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // Busca os imóveis assim que a tela carrega
  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      // Cria uma query para buscar na coleção 'imoveis', ordenando pelos mais recentes
      const q = query(collection(db, 'imoveis'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      
      const fetchedProperties: Property[] = []
      querySnapshot.forEach((doc) => {
        // Pega o ID gerado pelo Firebase e junta com os dados do imóvel
        fetchedProperties.push({ id: doc.id, ...doc.data() } as Property)
      })

      setProperties(fetchedProperties)
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error)
      alert("Erro ao carregar os imóveis. Verifique sua conexão ou o console.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este imóvel permanentemente?')) {
      try {
        // Deleta o documento lá no Firestore
        await deleteDoc(doc(db, 'imoveis', id))
        
        // Remove da tela sem precisar recarregar a página
        setProperties(prev => prev.filter(property => property.id !== id))
        
        alert('✅ Imóvel excluído com sucesso!')
      } catch (error) {
        console.error("Erro ao excluir imóvel:", error)
        alert('Erro ao excluir. Tente novamente.')
      }
    }
  }

  // Filtro de busca local (pelo título ou bairro)
  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Meus Imóveis</h1>
          <p className="text-sm text-text-muted mt-1">Gerencie seu portfólio de propriedades.</p>
        </div>
        
        <Link 
          to="/admin/imoveis/novo" 
          className="btn-primary w-full sm:w-auto text-sm"
        >
          <Plus className="w-4 h-4" />
          Novo Imóvel
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-bg-card p-4 rounded-xl border border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-text-muted" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg leading-5 bg-bg-dark text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
            placeholder="Buscar imóveis por título ou bairro..."
          />
        </div>
        
        <div className="text-sm text-text-muted font-medium whitespace-nowrap">
          {filteredProperties.length} imóveis cadastrados
        </div>
      </div>

      {/* Property List / Loading State */}
      <div className="bg-bg-card border border-border rounded-xl overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full p-12 text-text-muted">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
            <p>Carregando imóveis...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-bg-dark/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Imóvel
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Localização
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Preço
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-bg-section/80 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-16 shrink-0 rounded-md overflow-hidden bg-bg-dark flex items-center justify-center border border-border">
                          {property.images && property.images.length > 0 ? (
                            <img className="h-full w-full object-cover" src={property.images[0]} alt={property.title} />
                          ) : (
                            <Building2 className="h-6 w-6 text-text-muted/50" />
                          )}
                        </div>
                        <div className="min-w-0 max-w-[200px] sm:max-w-xs">
                          <div className="text-sm font-semibold text-text-primary truncate">
                            {property.title}
                          </div>
                          <div className="text-sm text-text-muted capitalize">
                            {property.type} • {property.purpose}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text-primary">{property.neighborhood}</div>
                      <div className="text-sm text-text-muted">{property.city} - {property.state}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-text-secondary">
                        {formatPrice(property.price, property.purpose)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.featured ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                          Destaque
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-bg-dark text-text-muted border border-border">
                          Padrão
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/imoveis/${property.id}`}
                          className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors border border-transparent hover:border-primary/20"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(property.id as string)}
                          className="p-2 text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors border border-transparent hover:border-red-400/20"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {!loading && filteredProperties.length === 0 && (
              <div className="p-12 text-center">
                <Building2 className="mx-auto h-12 w-12 text-text-muted/30" />
                <h3 className="mt-2 text-sm font-medium text-text-primary">Nenhum imóvel encontrado</h3>
                <p className="mt-1 text-sm text-text-muted">
                  {searchTerm ? 'Nenhum resultado para a sua busca.' : 'Comece adicionando seu primeiro imóvel ao portfólio.'}
                </p>
                {!searchTerm && (
                  <div className="mt-6">
                    <Link to="/admin/imoveis/novo" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-light transition-colors">
                      Adicionar novo imóvel <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}