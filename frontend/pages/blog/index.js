import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { FiSearch, FiChevronLeft, FiChevronRight, FiCalendar, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { value: '', label: 'Todas', icon: '📂' },
    { value: 'noticias', label: 'Noticias', icon: '📰' },
    { value: 'predicciones', label: 'Predicciones', icon: '🔮' },
    { value: 'fichajes', label: 'Fichajes', icon: '✍️' },
    { value: 'lesiones', label: 'Lesiones', icon: '🏥' },
    { value: 'curiosidades', label: 'Curiosidades', icon: '⚡' }
  ];

  useEffect(() => {
    fetchPosts();
  }, [page, selectedCategory, searchQuery]);

  // Load Ezoic ads
  useEffect(() => {
    if (!loading && typeof window !== 'undefined' && window.ezstandalone) {
      // Destroy previous placeholder when changing pages
      window.ezstandalone.cmd.push(function () {
        window.ezstandalone.destroyPlaceholders(104);
      });

      // Show ads for new page
      window.ezstandalone.cmd.push(function () {
        window.ezstandalone.showAds(104);
      });
    }

    // Cleanup when component unmounts
    return () => {
      if (typeof window !== 'undefined' && window.ezstandalone) {
        window.ezstandalone.cmd.push(function () {
          window.ezstandalone.destroyPlaceholders(104);
        });
      }
    };
  }, [loading, page]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      const params = {
        page,
        limit: 9
      };

      if (selectedCategory) params.category = selectedCategory;
      if (searchQuery) params.search = searchQuery;

      const queryString = new URLSearchParams(params).toString();
      const res = await fetch(`https://stack-project.onrender.com/api/blog?${queryString}`);
      const data = await res.json();
      
      if (data.success) {
        setPosts(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchPosts();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Layout
      title="Blog"
      description="Noticias, análisis y opiniones sobre el mundo del fútbol"
    >
      <div className="min-h-screen bg-slate-950 py-12">
        <div className="container-custom">
          
          {/* Header */}
          <div className="mb-12 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black mb-4"
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Blog & Noticias
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400"
            >
              Las últimas noticias, análisis y opiniones del mundo del fútbol
            </motion.p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              
              {/* Search */}
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar artículos..."
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
                  />
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </form>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value} className="bg-slate-900">
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Ezoic Ad - Blog List Top */}
          <div className="mb-8">
            <div id="ezoic-pub-ad-placeholder-104"></div>
          </div>

          {/* Posts Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-white/10"></div>
                  <div className="p-6">
                    <div className="h-4 bg-white/10 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-white/10 rounded mb-2"></div>
                    <div className="h-6 bg-white/10 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-white/10 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer h-full"
                  >
                    {/* Cover Image */}
                    {post.coverImage && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      {/* Category */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block px-3 py-1 bg-primary-600/20 text-primary-400 border border-primary-600/30 rounded-full text-xs font-semibold uppercase">
                          {post.category}
                        </span>
                        {post.featured && (
                          <span className="text-yellow-400 text-xs">⭐ Destacado</span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FiUser className="w-4 h-4" />
                          <span>{typeof post.author === 'string' ? post.author : post.author?.name || 'Stack Editorial'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiCalendar className="w-4 h-4" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag, idx) => (
                            <span 
                              key={idx}
                              className="text-xs text-gray-500"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-400 text-xl">
                No se encontraron artículos
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-3 rounded-xl bg-white/5 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors text-white"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                          page === pageNum
                            ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg'
                            : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === page - 2 || pageNum === page + 2) {
                    return <span key={pageNum} className="text-gray-600">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-3 rounded-xl bg-white/5 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors text-white"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}