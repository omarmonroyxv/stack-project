import express from 'express';
import blogController from '../controllers/blogController.js';

const router = express.Router();

// Rutas públicas del blog
router.get('/posts', blogController.getAllPosts);
router.get('/posts/featured', blogController.getFeaturedPosts);
router.get('/posts/category/:category', blogController.getPostsByCategory);
router.get('/posts/:slug', blogController.getPostBySlug);
router.get('/posts/:slug/related', blogController.getRelatedPosts);
router.post('/posts/:slug/comments', blogController.addComment);

// Rutas de administración (en producción, proteger con autenticación)
router.post('/admin/posts', blogController.createPost);
router.put('/admin/posts/:id', blogController.updatePost);
router.delete('/admin/posts/:id', blogController.deletePost);

export default router;
