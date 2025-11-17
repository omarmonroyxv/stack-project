import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiEye, FiArrowLeft, FiTag } from 'react-icons/fi';

export default function PostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://stack-project.onrender.com/api/blog/${slug}`);
        const data = await res.json();

        if (data.success) {
          setPost(data.data.post || data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <Layout title="Cargando...">
        <div className="min-h-screen bg-slate-950 py-12">
          <div className="container-custom max-w-4xl">
            <div className="animate-pulse">
              <div className="h-8 bg-white/10 rounded w-1/4 mb-8"></div>
              <div className="h-96 bg-white/10 rounded mb-8"></div>
              <div className="h-12 bg-white/10 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-white/10 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout title="Post no encontrado">
        <div className="min-h-screen bg-slate-950 py-12">
          <div className="container-custom max-w-4xl text-center">
            <div className="text-6xl mb-6">😕</div>
            <h1 className="text-4xl font-bold text-white mb-4">Post no encontrado</h1>
            <p className="text-gray-400 mb-8">El artículo que buscas no existe o ha sido eliminado</p>
            <Link href="/blog">
              <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 inline-flex items-center gap-2">
                <FiArrowLeft className="w-5 h-5" />
                Volver al blog
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={post.title} description={post.excerpt}>
      <div className="min-h-screen bg-slate-950">
        
        {/* Back Button */}
        <div className="border-b border-white/5">
          <div className="container-custom py-6">
            <Link href="/blog">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-xl transition-all duration-300">
                <FiArrowLeft className="w-5 h-5" />
                Volver al blog
              </button>
            </Link>
          </div>
        </div>

        <article className="container-custom py-12 max-w-4xl">
          
          {/* Cover Image */}
          {post.coverImage && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full h-96 rounded-2xl overflow-hidden mb-8"
            >
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
            </motion.div>
          )}
          
          {/* Category & Featured Badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="inline-block px-4 py-2 bg-primary-600/20 text-primary-400 border border-primary-600/30 rounded-full text-sm font-semibold uppercase">
              {post.category}
            </span>
            {post.featured && (
              <span className="inline-flex items-center gap-1 px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-sm font-semibold">
                ⭐ Destacado
              </span>
            )}
          </motion.div>
          
          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          {post.excerpt && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-400 mb-8 leading-relaxed"
            >
              {post.excerpt}
            </motion.p>
          )}
          
          {/* Meta Information */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 text-gray-400 mb-12 pb-8 border-b border-white/10"
          >
            <div className="flex items-center gap-2">
              <FiUser className="w-5 h-5" />
              <span className="font-semibold">{post.author || 'Stack Editorial'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="w-5 h-5" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            {post.views !== undefined && (
              <div className="flex items-center gap-2">
                <FiEye className="w-5 h-5" />
                <span>{post.views} vistas</span>
              </div>
            )}
          </motion.div>
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="prose prose-lg prose-invert max-w-none mb-12"
            style={{
              color: '#e5e7eb',
            }}
          >
            <div 
              className="text-gray-300 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .split('\n')
                  .map(line => {
                    // Headers
                    if (line.startsWith('### ')) {
                      return `<h3 class="text-2xl font-bold text-white mt-8 mb-4">${line.replace('### ', '')}</h3>`;
                    }
                    if (line.startsWith('## ')) {
                      return `<h2 class="text-3xl font-bold text-white mt-10 mb-6">${line.replace('## ', '')}</h2>`;
                    }
                    if (line.startsWith('# ')) {
                      return `<h1 class="text-4xl font-bold text-white mt-12 mb-6">${line.replace('# ', '')}</h1>`;
                    }
                    // Bold
                    line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
                    // Italic
                    line = line.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
                    // Lists
                    if (line.startsWith('- ')) {
                      return `<li class="ml-6">${line.replace('- ', '')}</li>`;
                    }
                    // Empty lines
                    if (line.trim() === '') {
                      return '<br/>';
                    }
                    // Regular paragraphs
                    return `<p class="text-gray-300 leading-relaxed">${line}</p>`;
                  })
                  .join('') 
              }} 
            />
          </motion.div>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FiTag className="w-5 h-5" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-full text-sm hover:bg-white/10 hover:text-white transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Back to Blog Button */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-center"
          >
            <Link href="/blog">
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white font-bold text-lg rounded-xl shadow-2xl shadow-primary-500/30 transition-all duration-300">
                <FiArrowLeft className="w-5 h-5" />
                Volver al blog
              </button>
            </Link>
          </motion.div>
        </article>
      </div>
    </Layout>
  );
}