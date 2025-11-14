import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// ============================================
// GET /api/blog
// Obtener todos los posts publicados (con filtros y paginación)
// ============================================
router.get('/', async (req, res) => {
  try {
    const {
      category,
      tags,
      featured,
      page = 1,
      limit = 12,
      sort = '-publishedAt',
      search
    } = req.query;

    const skip = (page - 1) * limit;
    
    let posts;
    let total;
    
    // Si hay búsqueda
    if (search) {
      posts = await Blog.search(search, { limit: parseInt(limit), skip });
      total = await Blog.countDocuments({
        status: 'published',
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } }
        ]
      });
    } else {
      // Filtros normales
      const options = {
        category,
        tags: tags ? tags.split(',') : undefined,
        featured: featured === 'true' ? true : undefined,
        limit: parseInt(limit),
        skip,
        sort
      };
      
      posts = await Blog.getPublished(options);
      
      // Contar total
      const countQuery = { status: 'published' };
      if (category) countQuery.category = category;
      if (tags) countQuery.tags = { $in: tags.split(',') };
      if (featured === 'true') countQuery.featured = true;
      
      total = await Blog.countDocuments(countQuery);
    }

    res.json({
      success: true,
      data: posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error obteniendo posts:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo artículos'
    });
  }
});

// ============================================
// GET /api/blog/featured
// Obtener artículos destacados
// ============================================
router.get('/featured', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const posts = await Blog.getPublished({
      featured: true,
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    console.error('Error obteniendo destacados:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo artículos destacados'
    });
  }
});

// ============================================
// GET /api/blog/categories
// Obtener todas las categorías con conteo
// ============================================
router.get('/categories', async (req, res) => {
  try {
    const categories = await Blog.aggregate([
      { $match: { status: 'published' } },
      { 
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const categoriesMap = {
      'noticias': { name: 'Noticias', icon: '📰', description: 'Últimas noticias del fútbol' },
      'lesiones': { name: 'Lesiones', icon: '🏥', description: 'Reportes de lesiones' },
      'predicciones': { name: 'Predicciones', icon: '🔮', description: 'Análisis y pronósticos' },
      'fichajes': { name: 'Fichajes', icon: '✍️', description: 'Transferencias y rumores' },
      'curiosidades': { name: 'Curiosidades', icon: '⚡', description: 'Datos raros y más' }
    };

    const result = categories.map(cat => ({
      slug: cat._id,
      ...categoriesMap[cat._id],
      count: cat.count
    }));

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo categorías'
    });
  }
});

// ============================================
// GET /api/blog/tags
// Obtener todos los tags populares
// ============================================
router.get('/tags', async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    
    const tags = await Blog.aggregate([
      { $match: { status: 'published' } },
      { $unwind: '$tags' },
      { 
        $group: {
          _id: '$tags',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: parseInt(limit) }
    ]);

    res.json({
      success: true,
      data: tags.map(tag => ({
        name: tag._id,
        count: tag.count
      }))
    });
  } catch (error) {
    console.error('Error obteniendo tags:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo tags'
    });
  }
});

// ============================================
// GET /api/blog/:slug
// Obtener un post específico por slug
// ============================================
router.get('/:slug', async (req, res) => {
  try {
    const post = await Blog.findOne({ 
      slug: req.params.slug,
      status: 'published'
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Artículo no encontrado'
      });
    }

    // Incrementar vistas
    await post.incrementViews();

    // Obtener artículos relacionados
    const related = await Blog.getRelated(
      post._id,
      post.category,
      post.tags,
      3
    );

    res.json({
      success: true,
      data: {
        post,
        related
      }
    });
  } catch (error) {
    console.error('Error obteniendo post:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo artículo'
    });
  }
});

// ============================================
// POST /api/blog
// Crear nuevo post
// ============================================
router.post('/', async (req, res) => {
  try {
    const post = new Blog(req.body);
    await post.save();

    res.status(201).json({
      success: true,
      data: post,
      message: 'Artículo creado exitosamente'
    });
  } catch (error) {
    console.error('Error creando post:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Error creando artículo'
    });
  }
});

// ============================================
// PUT /api/blog/:slug
// Actualizar post existente
// ============================================
router.put('/:slug', async (req, res) => {
  try {
    const post = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { 
        new: true,
        runValidators: true
      }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Artículo no encontrado'
      });
    }

    res.json({
      success: true,
      data: post,
      message: 'Artículo actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error actualizando post:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Error actualizando artículo'
    });
  }
});

// ============================================
// DELETE /api/blog/:slug
// Eliminar post
// ============================================
router.delete('/:slug', async (req, res) => {
  try {
    const post = await Blog.findOneAndDelete({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Artículo no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Artículo eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando post:', error);
    res.status(500).json({
      success: false,
      error: 'Error eliminando artículo'
    });
  }
});

// ============================================
// PATCH /api/blog/:slug/publish
// Publicar un post
// ============================================
router.patch('/:slug/publish', async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Artículo no encontrado'
      });
    }

    await post.publish();

    res.json({
      success: true,
      data: post,
      message: 'Artículo publicado exitosamente'
    });
  } catch (error) {
    console.error('Error publicando post:', error);
    res.status(500).json({
      success: false,
      error: 'Error publicando artículo'
    });
  }
});

// ============================================
// GET /api/blog/stats/overview
// Obtener estadísticas generales del blog
// ============================================
router.get('/stats/overview', async (req, res) => {
  try {
    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      totalViews,
      byCategory
    ] = await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({ status: 'published' }),
      Blog.countDocuments({ status: 'draft' }),
      Blog.aggregate([
        { $group: { _id: null, total: { $sum: '$views' } } }
      ]),
      Blog.aggregate([
        { $match: { status: 'published' } },
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ])
    ]);

    res.json({
      success: true,
      data: {
        totalPosts,
        publishedPosts,
        draftPosts,
        totalViews: totalViews[0]?.total || 0,
        byCategory
      }
    });
  } catch (error) {
    console.error('Error obteniendo stats:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo estadísticas'
    });
  }
});

export default router;