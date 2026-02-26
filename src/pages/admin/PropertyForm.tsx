import { useState } from 'react'
import { ArrowLeft, Save, UploadCloud, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import type { Property } from '@/data/properties'

export default function PropertyForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    description: '',
    price: 0,
    location: '',
    neighborhood: '',
    city: 'Campinas',
    state: 'SP',
    type: 'apartamento',
    purpose: 'venda',
    bedrooms: 0,
    bathrooms: 0,
    parkingSpaces: 0,
    area: 0,
    featured: false,
    images: [] // mock strings for now
  })

  // Simulated local image preview
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const parsedValue = type === 'number' ? Number(value) : value
    
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }))
  }

  const handleToggleFeatured = () => {
    setFormData(prev => ({
      ...prev,
      featured: !prev.featured
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // Simulate reading files and creating generic preview URLs
      const newPreviews = Array.from(files).map(file => URL.createObjectURL(file))
      setImagePreviews(prev => [...prev, ...newPreviews])
      // Em um cenário real de Firestore, subiríamos os arquivos pro Storage
    }
  }

  const handleRemoveImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate formatting data to save
    const payloadToSave: Partial<Property> = {
      ...formData,
      images: imagePreviews, // replace with valid URLs
      createdAt: new Date().toISOString()
    }

    console.log('--- PAYLOAD TO SAVE ---', payloadToSave)
    // TODO: Integrar com Firestore aqui:
    // try {
    //   await addDoc(collection(db, 'properties'), payloadToSave)
    //   alert('Imóvel salvo com sucesso!')
    //   navigate('/admin/imoveis')
    // } catch (err) { ... }

    alert('✅ Imóvel salvo com sucesso! Confira o console para a Payload de dados enviada.')
    navigate('/admin/imoveis')
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          to="/admin/imoveis" 
          className="p-2 -ml-2 text-text-muted hover:bg-bg-card hover:text-text-primary rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Novo Imóvel</h1>
          <p className="text-sm text-text-muted">Preencha os dados para anunciar a propriedade.</p>
        </div>
      </div>

      {/* Main Form container */}
      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Card: Informações Básicas */}
        <div className="bg-bg-card p-6 md:p-8 rounded-2xl border border-border">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Informações Básicas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-text-secondary">Título do Anúncio</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Apartamento Moderno no Cambuí"
                className="w-full rounded-lg border border-border px-4 py-2.5 bg-bg-dark text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted/50"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-text-secondary">Descrição</label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva os detalhes do imóvel..."
                className="w-full rounded-lg border border-border px-4 py-2.5 bg-bg-dark text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted/50 resize-y"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium text-text-secondary">Tipo de Imóvel</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-lg border border-border px-4 py-2.5 bg-bg-dark text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              >
                <option value="apartamento">Apartamento</option>
                <option value="casa">Casa</option>
                <option value="cobertura">Cobertura</option>
                <option value="terreno">Terreno</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="purpose" className="block text-sm font-medium text-text-secondary">Finalidade</label>
              <select
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full rounded-lg border border-border px-4 py-2.5 bg-bg-dark text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              >
                <option value="venda">Venda</option>
                <option value="aluguel">Aluguel</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-medium text-text-secondary">Preço (R$)</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="0,00"
                className="w-full rounded-lg border border-border px-4 py-2.5 bg-bg-dark text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted/50"
              />
            </div>
          </div>
        </div>

        {/* Card: Detalhes do Imóvel */}
        <div className="bg-bg-card p-6 md:p-8 rounded-2xl border border-border">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Características</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label htmlFor="bedrooms" className="block text-sm font-medium text-text-secondary">Quartos</label>
              <input
                id="bedrooms"
                name="bedrooms"
                type="number"
                min="0"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full rounded-lg border border-border px-4 py-2.5 bg-bg-dark text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="bathrooms" className="block text-sm font-medium text-text-secondary">Banheiros</label>
              <input
                id="bathrooms"
                name="bathrooms"
                type="number"
                min="0"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full rounded-lg border border-border px-4 py-2.5 bg-bg-dark text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="parkingSpaces" className="block text-sm font-medium text-text-secondary">Vagas</label>
              <input
                id="parkingSpaces"
                name="parkingSpaces"
                type="number"
                min="0"
                value={formData.parkingSpaces}
                onChange={handleChange}
                className="w-full rounded-lg border border-border px-4 py-2.5 bg-bg-dark text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="area" className="block text-sm font-medium text-text-secondary">Área (m²)</label>
              <input
                id="area"
                name="area"
                type="number"
                min="0"
                value={formData.area}
                onChange={handleChange}
                className="w-full rounded-lg border border-border px-4 py-2.5 bg-bg-dark text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Card: Localização */}
        <div className="bg-bg-card p-6 md:p-8 rounded-2xl border border-border">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Localização</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-text-secondary">Endereço Completo</label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Rua, Número, Complemento"
                className="w-full rounded-lg border border-border px-4 py-2.5 bg-bg-dark text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted/50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="neighborhood" className="block text-sm font-medium text-text-secondary">Bairro</label>
              <input
                id="neighborhood"
                name="neighborhood"
                type="text"
                value={formData.neighborhood}
                onChange={handleChange}
                placeholder="Ex: Cambuí"
                className="w-full rounded-lg border border-border px-4 py-2.5 bg-bg-dark text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-medium text-text-secondary">Cidade</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border px-4 py-2.5 bg-bg-dark text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="state" className="block text-sm font-medium text-text-secondary">Estado</label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  maxLength={2}
                  className="w-full rounded-lg border border-border px-4 py-2.5 bg-bg-dark text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all uppercase"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card: Mídia */}
        <div className="bg-bg-card p-6 md:p-8 rounded-2xl border border-border">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Mídia</h2>
          
          <div className="space-y-4">
            <label className="block text-sm font-medium text-text-secondary">Imagens do Imóvel</label>
            
            <div className="w-full flex items-center justify-center p-8 border-2 border-dashed border-border rounded-xl bg-bg-dark hover:border-primary/50 transition-colors cursor-pointer group relative">
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border border-border bg-bg-card flex items-center justify-center mx-auto mb-3 text-primary group-hover:scale-110 transition-transform duration-200">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-text-primary">Clique para fazer upload ou arraste</p>
                <p className="text-xs text-text-muted mt-1">PNG, JPG ou WEBP (Max 5MB)</p>
              </div>
            </div>

            {/* Preview Grid */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-border group">
                    <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-bg-dark/90 rounded-md text-red-500 opacity-0 group-hover:opacity-100 transition-opacity border border-border hover:border-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Destaque & Submit */}
        <div className="bg-bg-card p-6 md:p-8 rounded-2xl border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          
          <div>
            <h3 className="text-base font-semibold text-text-primary">Imóvel em Destaque</h3>
            <p className="text-sm text-text-muted mt-1">Imóveis em destaque ganham mais visibilidade na página principal.</p>
          </div>
          
          <button
            type="button"
            onClick={handleToggleFeatured}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-dark ${
              formData.featured ? 'bg-primary' : 'bg-bg-dark border border-border'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.featured ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <Link
            to="/admin/imoveis"
            className="px-6 py-3 rounded-xl font-medium text-text-muted bg-bg-card border border-border hover:bg-bg-section transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="btn-primary"
          >
            <Save className="w-5 h-5" />
            Salvar Imóvel
          </button>
        </div>
      </form>
    </div>
  )
}
