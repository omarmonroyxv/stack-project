import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiEye,
  FiClock,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';

export default function AdminDashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, published, draft

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('https://stack-project.onrender.com/api/blog');
      const data = await response.json();
      setArticles(data.data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (slug) => {
    if (!confirm('¿Estás seguro de eliminar este artículo?')) return;

    try {
      await fetch(`https://stack-project.onrender.com/api/blog/${slug}`, { method: 'DELETE' });
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const filteredArticles = articles.filter(article => {
    if (filter === 'all') return true;
    return article.status === filter;
  });

  const stats = {
    total: articles.length,
    published: articles.filter(a => a.status === 'published').length,
    draft: articles.filter(a => a.status === 'draft').length,
    views: articles.reduce((sum, a) => sum + (a.views || 0), 0)
  };

  return (
    <Layout title="Admin - Dashboard">
      <div className="min-h-screen bg-slate-950 py-12">
        <div className="container-custom">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Panel de Administración
              </h1>
              <p className="text-gray-400">
                Gestiona todos tus artículos
              </p>
            </div>
            
            <Link href="/admin/new">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all duration-300"
              >
                <FiPlus className="w-5 h-5" />
                Nuevo Artículo
              </motion.button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="text-gray-400 text-sm mb-2">Total</div>
              <div className="text-3xl font-bold text-white">{stats.total}</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="text-gray-400 text-sm mb-2">Publicados</div>
              <div className="text-3xl font-bold text-green-400">{stats.published}</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="text-gray-400 text-sm mb-2">Borradores</div>
              <div className="text-3xl font-bold text-yellow-400">{stats.draft}</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="text-gray-400 text-sm mb-2">Vistas Totales</div>
              <div className="text-3xl font-bold text-blue-400">{stats.views}</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-8">
            {['all', 'published', 'draft'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  filter === status
                    ? 'bg-primary-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {status === 'all' ? 'Todos' : status === 'published' ? 'Publicados' : 'Borradores'}
              </button>
            ))}
          </div>

          {/* Articles List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <FiAlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No hay artículos todavía</p>
              <Link href="/admin/new">
                <button className="mt-4 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-lg transition-colors">
                  Crear primer artículo
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {article.title}
                        </h3>
                        
                        {article.status === 'published' ? (
                          <span className="flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-sm font-semibold">
                            <FiCheckCircle className="w-4 h-4" />
                            Publicado
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 px-3 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full text-sm font-semibold">
                            <FiClock className="w-4 h-4" />
                            Borrador
                          </span>
                        )}
                        
                        {article.featured && (
                          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-sm font-semibold">
                            ⭐ Destacado
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-400 mb-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span>📂 {article.category}</span>
                        <span>👁️ {article.views || 0} vistas</span>
                        <span>📅 {new Date(article.createdAt).toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-6">
                      <Link href={`/blog/${article.slug}`}>
                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                          <FiEye className="w-5 h-5 text-gray-400" />
                        </button>
                      </Link>
                      
                      <Link href={`/admin/edit/${article.slug}`}>
                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                          <FiEdit2 className="w-5 h-5 text-blue-400" />
                        </button>
                      </Link>
                      
                      <button
                        onClick={() => deleteArticle(article.slug)}
                        className="p-3 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <FiTrash2 className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}