import { useState, useEffect } from 'react'
import { ArrowLeft, Save, UploadCloud, X } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Property } from '@/data/properties'

export default function PropertyForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  
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
    images: [] 
  })

  // Estados para gerenciar as imagens
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Busca os dados do imóvel se estivermos no modo edição
  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        try {
          const docRef = doc(db, 'imoveis', id)
          const docSnap = await getDoc(docRef)
          
          if (docSnap.exists()) {
            const data = docSnap.data() as Property
            setFormData(data)
            if (data.images) {
              setImagePreviews(data.images) // Carrega as fotos antigas pro preview
            }
          } else {
            alert('Imóvel não encontrado!')
            navigate('/admin/imoveis')
          }
        } catch (error) {
          console.error("Erro ao carregar o imóvel:", error)
        }
      }
      fetchProperty()
    }
  }, [id, navigate])

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
      const newFiles = Array.from(files)
      
      // Guarda os arquivos reais para enviar pro Cloudinary
      setImageFiles(prev => [...prev, ...newFiles])
      
      // Gera os previews visuais temporários
      const newPreviews = newFiles.map(file => URL.createObjectURL(file))
      setImagePreviews(prev => [...prev, ...newPreviews])
    }
  }

  const handleRemoveImage = (index: number) => {
    const removedPreview = imagePreviews[index]
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
    
    // Se a imagem sendo removida for nova (local), removemos de imageFiles
    if (!removedPreview.startsWith('http')) {
      const newFilesBeforeThis = imagePreviews.slice(0, index).filter(url => !url.startsWith('http')).length
      setImageFiles(prev => prev.filter((_, i) => i !== newFilesBeforeThis))
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const newUploadedUrls: string[] = []
      
      // 1. Fazer upload apenas das NOVAS imagens (imageFiles) para o Cloudinary
      for (const file of imageFiles) {
        const cloudinaryData = new FormData()
        cloudinaryData.append('file', file)
        
        // Mantendo seu upload_preset original
        cloudinaryData.append('upload_preset', 'db_default') 
        
        // Mantendo sua URL original Cloud Name
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/doxryebzb/image/upload', 
          {
            method: 'POST',
            body: cloudinaryData
          }
        )

        if (!res.ok) throw new Error('Falha ao subir imagem pro Cloudinary')
        
        const data = await res.json()
        newUploadedUrls.push(data.secure_url) 
      }

      // 2. Mesclar imagens antigas mantidas com as novas
      // URLs que começam com 'http' são do Cloudinary. O que for 'blob:' era preview local.
      const retainedExistingUrls = imagePreviews.filter(url => url.startsWith('http'))
      const finalImages = [...retainedExistingUrls, ...newUploadedUrls]

      // 3. Montar o objeto final
      const payloadToSave = {
        ...formData,
        images: finalImages,
        updatedAt: serverTimestamp() 
      }

      // 4. Decidir se é Create (Novo) ou Update (Edição)
      if (id) {
        // Modo Edição
        const docRef = doc(db, 'imoveis', id)
        await updateDoc(docRef, payloadToSave)
        alert('✅ Imóvel atualizado com sucesso!')
      } else {
        // Modo Criação
        await addDoc(collection(db, 'imoveis'), {
          ...payloadToSave,
          createdAt: serverTimestamp() // Só grava createdAt na criação
        })
        alert('✅ Imóvel salvo com sucesso!')
      }

      navigate('/admin/imoveis')
      
    } catch (error) {
      console.error("Erro ao salvar o imóvel:", error)
      alert('Erro ao salvar. Verifique o console para mais detalhes.')
    } finally {
      setIsSubmitting(false)
    }
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
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            {id ? 'Editar Imóvel' : 'Novo Imóvel'}
          </h1>
          <p className="text-sm text-text-muted">
            {id ? 'Atualize os dados da propriedade.' : 'Preencha os dados para anunciar a propriedade.'}
          </p>
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
            disabled={isSubmitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {isSubmitting ? 'Salvando...' : (id ? 'Atualizar Imóvel' : 'Salvar Imóvel')}
          </button>
        </div>
      </form>
    </div>
  )
}