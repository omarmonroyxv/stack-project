import Post from '../models/Post.js';

class BlogController {
  // Obtener todos los posts publicados con paginación
  async getAllPosts(req, res) {
    try {
      const { page = 1, limit = 10, category, tag, search } = req.query;
      const query = { published: true };

      // Filtros opcionales
      if (category) query.category = category;
      if (tag) query.tags = tag;
      if (search) {
        query.$text = { $search: search };
      }

      const posts = await Post.find(query)
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .select('-content')
        .exec();

      const count = await Post.countDocuments(query);

      res.json({
        success: true,
        data: posts,
        pagination: {
          total: count,
          page: parseInt(page),
          pages: Math.ceil(count / limit)
        }
      });

    } catch (error) {
      console.error('Error obteniendo posts:', error);
      res.status(500).json({
        success: false,
        error: 'Error obteniendo posts'
      });
    }
  }

  // Obtener un post por slug
  async getPostBySlug(req, res) {
    try {
      const { slug } = req.params;

      const post = await Post.findOne({ slug, published: true })
        .populate('relatedPosts', 'title slug excerpt coverImage createdAt');

      if (!post) {
        return res.status(404).json({
          success: false,
          error: 'Post no encontrado'
        });
      }

      // Incrementar vistas
      await post.incrementViews();

      res.json({
        success: true,
        data: post
      });

    } catch (error) {
      console.error('Error obteniendo post:', error);
      res.status(500).json({
        success: false,
        error: 'Error obteniendo post'
      });
    }
  }

  // Obtener posts destacados
  async getFeaturedPosts(req, res) {
    try {
      const posts = await Post.find({ published: true, featured: true })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('-content');

      res.json({
        success: true,
        data: posts
      });

    } catch (error) {
      console.error('Error obteniendo posts destacados:', error);
      res.status(500).json({
        success: false,
        error: 'Error obteniendo posts destacados'
      });
    }
  }

  // Obtener posts por categoría
  async getPostsByCategory(req, res) {
    try {
      const { category } = req.params;
      const { page = 1, limit = 10 } = req.query;

      const posts = await Post.find({ published: true, category })
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .select('-content');

      const count = await Post.countDocuments({ published: true, category });

      res.json({
        success: true,
        data: posts,
        pagination: {
          total: count,
          page: parseInt(page),
          pages: Math.ceil(count / limit)
        }
      });

    } catch (error) {
      console.error('Error obteniendo posts por categoría:', error);
      res.status(500).json({
        success: false,
        error: 'Error obteniendo posts'
      });
    }
  }

  // Crear nuevo post (admin)
  async createPost(req, res) {
    try {
      const postData = req.body;

      const post = new Post(postData);
      await post.save();

      res.status(201).json({
        success: true,
        data: post,
        message: 'Post creado exitosamente'
      });

    } catch (error) {
      console.error('Error creando post:', error);
      res.status(500).json({
        success: false,
        error: 'Error creando post'
      });
    }
  }

  // Actualizar post (admin)
  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const post = await Post.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      );

      if (!post) {
        return res.status(404).json({
          success: false,
          error: 'Post no encontrado'
        });
      }

      res.json({
        success: true,
        data: post,
        message: 'Post actualizado exitosamente'
      });

    } catch (error) {
      console.error('Error actualizando post:', error);
      res.status(500).json({
        success: false,
        error: 'Error actualizando post'
      });
    }
  }

  // Eliminar post (admin)
  async deletePost(req, res) {
    try {
      const { id } = req.params;

      const post = await Post.findByIdAndDelete(id);

      if (!post) {
        return res.status(404).json({
          success: false,
          error: 'Post no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Post eliminado exitosamente'
      });

    } catch (error) {
      console.error('Error eliminando post:', error);
      res.status(500).json({
        success: false,
        error: 'Error eliminando post'
      });
    }
  }

  // Agregar comentario a un post
  async addComment(req, res) {
    try {
      const { slug } = req.params;
      const { author, content } = req.body;

      if (!author || !content) {
        return res.status(400).json({
          success: false,
          error: 'Autor y contenido son requeridos'
        });
      }

      const post = await Post.findOne({ slug });

      if (!post) {
        return res.status(404).json({
          success: false,
          error: 'Post no encontrado'
        });
      }

      post.comments.push({ author, content });
      await post.save();

      res.json({
        success: true,
        data: post.comments[post.comments.length - 1],
        message: 'Comentario agregado exitosamente'
      });

    } catch (error) {
      console.error('Error agregando comentario:', error);
      res.status(500).json({
        success: false,
        error: 'Error agregando comentario'
      });
    }
  }

  // Obtener posts relacionados
  async getRelatedPosts(req, res) {
    try {
      const { slug } = req.params;

      const post = await Post.findOne({ slug });

      if (!post) {
        return res.status(404).json({
          success: false,
          error: 'Post no encontrado'
        });
      }

      // Buscar posts con tags similares
      const relatedPosts = await Post.find({
        _id: { $ne: post._id },
        published: true,
        $or: [
          { category: post.category },
          { tags: { $in: post.tags } }
        ]
      })
      .limit(4)
      .select('title slug excerpt coverImage createdAt');

      res.json({
        success: true,
        data: relatedPosts
      });

    } catch (error) {
      console.error('Error obteniendo posts relacionados:', error);
      res.status(500).json({
        success: false,
        error: 'Error obteniendo posts relacionados'
      });
    }
  }
}

export default new BlogController();
