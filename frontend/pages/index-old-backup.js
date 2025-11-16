import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MatchCard from '../components/MatchCard';
import BlogPostCard from '../components/BlogPostCard';
import { fixturesApi, blogApi } from '../lib/api';
import { FiTrendingUp, FiCalendar, FiBookOpen } from 'react-icons/fi';
import Link from 'next/link';

export default function Home() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState('api');

  useEffect(() => {
    fetchData();
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      // Obtener partidos en vivo
      const matchesRes = await fixturesApi.getLive();
      if (matchesRes.data.success) {
        setLiveMatches(matchesRes.data.data.slice(0, 6));
        setDataSource(matchesRes.data.source);
      }

      // Obtener posts destacados
      const postsRes = await blogApi.getFeaturedPosts();
      if (postsRes.data.success) {
        setFeaturedPosts(postsRes.data.data.slice(0, 3));
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <Layout
      title="Inicio"
      description="Sigue los resultados de fútbol en vivo y las últimas noticias del mundo del fútbol"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Resultados de Fútbol en Tiempo Real
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Sigue todos los partidos en vivo, fixtures, clasificaciones y las 
              últimas noticias del mundo del fútbol.
            </p>
            <Link href="/live" className="inline-block bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
              Ver Partidos en Vivo
            </Link>
          </div>
        </div>
      </section>

      {/* Live Matches Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <FiTrendingUp className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Partidos en Vivo
              </h2>
              {dataSource === 'scraping' && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Modo Scraping
                </span>
              )}
            </div>
            <Link href="/live" className="text-primary-600 hover:text-primary-700 font-semibold">
              Ver todos →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card p-4 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : liveMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveMatches.map((match, index) => (
                <MatchCard key={match.fixture?.id || index} match={match} source={dataSource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FiCalendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">
                No hay partidos en vivo en este momento
              </p>
              <Link href="/live" className="text-primary-600 hover:text-primary-700 font-semibold mt-4 inline-block">
                Ver fixtures de hoy →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <FiBookOpen className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Últimas Noticias
              </h2>
            </div>
            <Link href="/blog" className="text-primary-600 hover:text-primary-700 font-semibold">
              Ver todas →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <BlogPostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No hay posts disponibles</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            ¿Por qué Stack?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Datos en Tiempo Real</h3>
              <p className="text-gray-600">
                Actualizaciones constantes de todos los partidos en vivo
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCalendar className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Todas las Ligas</h3>
              <p className="text-gray-600">
                Cobertura de las principales ligas del mundo
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBookOpen className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Noticias y Análisis</h3>
              <p className="text-gray-600">
                Contenido exclusivo y análisis profundo
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
