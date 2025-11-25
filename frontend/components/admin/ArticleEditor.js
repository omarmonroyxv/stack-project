import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import { 
  FiSave, 
  FiEye, 
  FiX,
  FiImage,
  FiTag
} from 'react-icons/fi';

export default function ArticleEditor({ isEdit = false }) {
  const router = useRouter();
  const { slug } = router.query;
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'noticias',
    tags: [],
    coverImage: '',
    author: '',
    status: 'draft',
    featured: false,
    metaDescription: ''
  });

  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const categories = [
    'noticias',
    'predicciones',
    'fichajes',
    'lesiones',
    'curiosidades'
  ];

  useEffect(() => {
    if (isEdit && slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`https://stack-backend-7jvd.onrender.com/api/blog/${slug}`);
      const data = await response.json();
      if (data.success) {
        setFormData(data.data);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: !isEdit ? generateSlug(title) : prev.slug
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (status) => {
    setSaving(true);
    
    try {
      const url = isEdit 
        ? `https://stack-backend-7jvd.onrender.com/api/blog/${slug}` 
        : 'https://stack-backend-7jvd.onrender.com/api/blog';
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          status
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert(`Artículo ${status === 'published' ? 'publicado' : 'guardado'} exitosamente`);
        router.push('/admin');
      } else {
        alert('Error al guardar: ' + data.message);
      }
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Error al guardar el artículo');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout title={isEdit ? 'Editar Artículo' : 'Nuevo Artículo'}>
      <div className="min-h-screen bg-slate-950 py-12">
        <div className="container-custom max-w-5xl">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {isEdit ? 'Editar Artículo' : 'Nuevo Artículo'}
              </h1>
              <p className="text-gray-400">
                {isEdit ? 'Modifica tu artículo' : 'Crea un nuevo artículo para tu blog'}
              </p>
            </div>
            
            <button
              onClick={() => router.push('/admin')}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <FiX className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Ej: Alemania derrota a Luxemburgo 3-0"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  URL (slug) *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="alemania-derrota-luxemburgo-3-0"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Se genera automáticamente desde el título
                </p>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Extracto *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Breve resumen del artículo (1-2 oraciones)"
                  rows="3"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Contenido * (Markdown)
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Escribe tu artículo en formato Markdown..."
                  rows="20"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors font-mono text-sm resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Usa Markdown: **negrita**, *cursiva*, # títulos, etc.
                </p>
              </div>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Actions */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Acciones</h3>
                
                <div className="space-y-3">
                  <button
                    onClick={() => handleSubmit('draft')}
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    <FiSave className="w-5 h-5" />
                    {saving ? 'Guardando...' : 'Guardar Borrador'}
                  </button>
                  
                  <button
                    onClick={() => handleSubmit('published')}
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    <FiSave className="w-5 h-5" />
                    {saving ? 'Publicando...' : 'Publicar'}
                  </button>
                  
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors"
                  >
                    <FiEye className="w-5 h-5" />
                    Vista Previa
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="w-5 h-5 rounded bg-white/5 border-white/10 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-300">Artículo destacado</span>
                  </label>
                </div>
              </div>

              {/* Category */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Categoría</h3>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none transition-colors"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-slate-900">
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FiTag className="w-5 h-5" />
                  Etiquetas
                </h3>
                
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Agregar etiqueta"
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:border-primary-500 focus:outline-none"
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-lg transition-colors"
                  >
                    +
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-400 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Cover Image */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FiImage className="w-5 h-5" />
                  Imagen de Portada
                </h3>
                <input
                  type="url"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
                />
                {formData.coverImage && (
                  <img
                    src={formData.coverImage}
                    alt="Preview"
                    className="mt-4 w-full h-32 object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Author */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Autor</h3>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Nombre del autor"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Meta Description */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">SEO</h3>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  placeholder="Meta descripción para SEO (opcional)"
                  rows="3"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors resize-none"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}