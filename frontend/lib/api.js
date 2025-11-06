import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para manejar errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

// Fixtures API
export const fixturesApi = {
  getLive: () => apiClient.get('/fixtures/live'),
  getToday: () => apiClient.get('/fixtures/today'),
  getById: (id) => apiClient.get(`/fixtures/${id}`),
  getByDate: (date) => apiClient.get(`/fixtures/date/${date}`),
  getLeagues: () => apiClient.get('/fixtures/leagues'),
  getStandings: (leagueId, season) => apiClient.get('/fixtures/standings', {
    params: { leagueId, season }
  }),
  getStats: () => apiClient.get('/fixtures/stats')
};

// Blog API
export const blogApi = {
  getPosts: (params = {}) => apiClient.get('/blog/posts', { params }),
  getPostBySlug: (slug) => apiClient.get(`/blog/posts/${slug}`),
  getFeaturedPosts: () => apiClient.get('/blog/posts/featured'),
  getPostsByCategory: (category, params = {}) => 
    apiClient.get(`/blog/posts/category/${category}`, { params }),
  getRelatedPosts: (slug) => apiClient.get(`/blog/posts/${slug}/related`),
  addComment: (slug, data) => apiClient.post(`/blog/posts/${slug}/comments`, data)
};

export default apiClient;
