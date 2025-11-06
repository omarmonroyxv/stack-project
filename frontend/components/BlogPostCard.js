import Link from 'next/link';
import { formatDate, truncateText } from '../lib/utils';
import { FiClock, FiUser } from 'react-icons/fi';

export default function BlogPostCard({ post, featured = false }) {
  const CardWrapper = featured ? 'div' : 'div';
  
  return (
    <Link href={`/blog/${post.slug}`}>
      <CardWrapper className={`card overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform ${
        featured ? 'md:flex' : ''
      }`}>
        {/* Cover Image */}
        {post.coverImage && (
          <div className={`relative ${
            featured ? 'md:w-1/2' : 'w-full h-48'
          } bg-gray-200`}>
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            {post.featured && (
              <span className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Destacado
              </span>
            )}
          </div>
        )}

        {/* Content */}
        <div className={`p-6 ${featured ? 'md:w-1/2' : ''}`}>
          {/* Category */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-semibold uppercase">
              {post.category}
            </span>
            {post.tags && post.tags.length > 0 && (
              <span className="text-xs text-gray-500">
                #{post.tags[0]}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className={`font-bold text-gray-900 mb-2 ${
            featured ? 'text-2xl' : 'text-xl'
          }`}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4">
            {truncateText(post.excerpt, featured ? 200 : 120)}
          </p>

          {/* Meta */}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <FiUser className="w-4 h-4" />
              <span>{post.author?.name || 'Stack Team'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiClock className="w-4 h-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>

          {/* Read More */}
          <div className="mt-4">
            <span className="text-primary-600 font-semibold hover:text-primary-700">
              Leer más →
            </span>
          </div>
        </div>
      </CardWrapper>
    </Link>
  );
}
