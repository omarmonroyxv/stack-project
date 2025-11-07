import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { blogApi } from '../../lib/api';
import { formatDate } from '../../lib/utils';
import Link from 'next/link';

export default function PostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    const fetchPost = async () => {
      try {
        const res = await blogApi.getPostBySlug(slug);
        if (res.data.success) {
          setPost(res.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <Layout title="Cargando...">
        <div className="container-custom py-12 text-center">
          <p>Cargando post...</p>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout title="Post no encontrado">
        <div className="container-custom py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Post no encontrado</h1>
          <Link href="/blog" className="text-primary-600 hover:text-primary-700">
            ← Volver al blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={post.title} description={post.excerpt}>
      <article className="container-custom py-8 max-w-4xl">
        {/* Cover Image */}
        {post.coverImage && (
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}
        
        {/* Category */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold uppercase">
            {post.category}
          </span>
        </div>
        
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        {/* Meta */}
        <div className="flex items-center text-gray-600 mb-8 pb-8 border-b">
          <span>Por {post.author?.name || 'Stack Team'}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(post.createdAt)}</span>
          <span className="mx-2">•</span>
          <span>{post.views || 0} vistas</span>
        </div>
        
        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
        </div>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-bold mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Back button */}
        <div className="mt-8 text-center">
          <Link 
            href="/blog"
            className="inline-block px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors"
          >
            ← Volver al blog
          </Link>
        </div>
      </article>
    </Layout>
  );
}