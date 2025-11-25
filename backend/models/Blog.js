import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  // Contenido básico
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    maxlength: [200, 'El título no puede exceder 200 caracteres']
  },
  
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  excerpt: {
    type: String,
    required: [true, 'El extracto es obligatorio'],
    maxlength: [300, 'El extracto no puede exceder 300 caracteres']
  },
  
  content: {
    type: String,
    required: [true, 'El contenido es obligatorio']
  },
  
  // Categorización
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    enum: ['noticias', 'lesiones', 'predicciones', 'fichajes', 'curiosidades'],
    default: 'noticias'
  },
  
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Media
  featuredImage: {
    url: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    }
  },
  
  // SEO
  seo: {
    metaTitle: {
      type: String,
      maxlength: [60, 'El meta título no puede exceder 60 caracteres']
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'La meta descripción no puede exceder 160 caracteres']
    },
    keywords: [{
      type: String,
      trim: true
    }]
  },
  
  // Estado y visibilidad
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  
  featured: {
    type: Boolean,
    default: false
  },
  
  // Autor
  author: {
    name: {
      type: String,
      default: 'Stack Editorial'
    },
    avatar: {
      type: String,
      default: ''
    }
  },
  
  // Engagement
  views: {
    type: Number,
    default: 0
  },
  
  readTime: {
    type: Number, // en minutos
    default: 5
  },
  
  // Fechas
  publishedAt: {
    type: Date,
    default: null
  },
  
  scheduledFor: {
    type: Date,
    default: null
  }
  
}, {
  timestamps: true, // createdAt, updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ============================================
// INDEXES PARA RENDIMIENTO
// ============================================

blogSchema.index({ slug: 1 });
blogSchema.index({ category: 1, status: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ publishedAt: -1 });
blogSchema.index({ featured: 1, status: 1 });
blogSchema.index({ 'seo.keywords': 1 });

// ============================================
// VIRTUAL PARA URL COMPLETA
// ============================================

blogSchema.virtual('url').get(function() {
  return `/blog/${this.slug}`;
});

// ============================================
// MÉTODOS DE INSTANCIA
// ============================================

// Incrementar vistas
blogSchema.methods.incrementViews = async function() {
  this.views += 1;
  return this.save();
};

// Publicar artículo
blogSchema.methods.publish = async function() {
  this.status = 'published';
  this.publishedAt = new Date();
  return this.save();
};

// Despublicar artículo
blogSchema.methods.unpublish = async function() {
  this.status = 'draft';
  this.publishedAt = null;
  return this.save();
};

// ============================================
// MÉTODOS ESTÁTICOS
// ============================================

// Obtener artículos publicados
blogSchema.statics.getPublished = function(options = {}) {
  const { 
    category, 
    tags, 
    featured,
    limit = 10, 
    skip = 0,
    sort = '-publishedAt'
  } = options;
  
  const query = { status: 'published' };
  
  if (category) query.category = category;
  if (tags && tags.length > 0) query.tags = { $in: tags };
  if (featured !== undefined) query.featured = featured;
  
  return this.find(query)
    .sort(sort)
    .limit(limit)
    .skip(skip)
    .select('-content'); // No incluir contenido completo en listados
};

// Buscar artículos
blogSchema.statics.search = function(searchTerm, options = {}) {
  const { limit = 10, skip = 0 } = options;
  
  return this.find({
    status: 'published',
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { excerpt: { $regex: searchTerm, $options: 'i' } },
      { tags: { $regex: searchTerm, $options: 'i' } }
    ]
  })
  .sort('-publishedAt')
  .limit(limit)
  .skip(skip);
};

// Obtener relacionados
blogSchema.statics.getRelated = function(postId, category, tags, limit = 3) {
  return this.find({
    _id: { $ne: postId },
    status: 'published',
    $or: [
      { category: category },
      { tags: { $in: tags } }
    ]
  })
  .sort('-publishedAt')
  .limit(limit)
  .select('title slug excerpt featuredImage category publishedAt readTime');
};

// ============================================
// MIDDLEWARE PRE-SAVE
// ============================================

// Auto-generar slug si no existe
blogSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // Auto-calcular tiempo de lectura (250 palabras por minuto)
  if (this.content) {
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / 250);
  }

  // Auto-establecer publishedAt cuando el status es 'published'
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  // Auto-generar meta title y description si no existen
  if (!this.seo.metaTitle) {
    this.seo.metaTitle = this.title.substring(0, 60);
  }

  if (!this.seo.metaDescription) {
    this.seo.metaDescription = this.excerpt.substring(0, 160);
  }

  next();
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;