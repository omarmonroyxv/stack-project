import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MatchCard from '../components/MatchCard';
import { fixturesApi } from '../lib/api';
import { FiRefreshCw, FiFilter } from 'react-icons/fi';

export default function Live() {
  const [matches, setMatches] = useState([]);
  const [todayFixtures, setTodayFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState('api');
  const [apiStats, setApiStats] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'live', 'scheduled'
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    fetchMatches();
    // Auto-refresh cada 30 segundos
    const interval = setInterval(() => {
      fetchMatches();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchMatches = async () => {
    try {
      // Obtener partidos en vivo
      const liveRes = await fixturesApi.getLive();
      if (liveRes.data.success) {
        setMatches(liveRes.data.data);
        setDataSource(liveRes.data.source);
        if (liveRes.data.apiStats) {
          setApiStats(liveRes.data.apiStats);
        }
      }

      // Obtener fixtures de hoy
      const todayRes = await fixturesApi.getToday();
      if (todayRes.data.success) {
        setTodayFixtures(todayRes.data.data);
      }

      setLastUpdate(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching matches:', error);
      setLoading(false);
    }
  };

  const getFilteredMatches = () => {
    if (filter === 'live') {
      return matches;
    } else if (filter === 'scheduled') {
      return todayFixtures.filter(f => f.fixture?.status?.short === 'NS');
    }
    return [...matches, ...todayFixtures];
  };

  const filteredMatches = getFilteredMatches();

  return (
    <Layout
      title="Partidos en Vivo"
      description="Sigue todos los partidos de fútbol en vivo con actualizaciones en tiempo real"
    >
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Partidos en Vivo
          </h1>
          <p className="text-gray-600">
            Última actualización: {typeof window !== 'undefined' ? lastUpdate.toLocaleTimeString('es-MX') : ''}
          </p>
        </div>

        {/* Stats and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Data Source Info */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Fuente de datos:
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                dataSource === 'api' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {dataSource === 'api' ? 'TheSportsDB' : 'Scraping'}
              </span>
            </div>

            {/* API Stats */}
            {apiStats && (
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>
                  Requests: {apiStats.requestsUsed}/{apiStats.maxRequests}
                </span>
                <span>
                  Reset en: {apiStats.resetInMinutes} min
                </span>
              </div>
            )}

            {/* Refresh Button */}
            <button
              onClick={fetchMatches}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Actualizar</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 mb-6 overflow-x-auto">
          <FiFilter className="w-5 h-5 text-gray-600 flex-shrink-0" />
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todos ({matches.length + todayFixtures.length})
          </button>
          <button
            onClick={() => setFilter('live')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === 'live'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            En Vivo ({matches.length})
          </button>
          <button
            onClick={() => setFilter('scheduled')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === 'scheduled'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Programados ({todayFixtures.filter(f => f.fixture?.status?.short === 'NS').length})
          </button>
        </div>

        {/* Matches Grid */}
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
        ) : filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match, index) => (
              <MatchCard 
                key={match.fixture?.id || index} 
                match={match} 
                source={dataSource}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiRefreshCw className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay partidos disponibles
            </h3>
            <p className="text-gray-600">
              {filter === 'live' 
                ? 'No hay partidos en vivo en este momento'
                : 'No hay partidos programados para hoy'}
            </p>
          </div>
        )}

        {/* Info Box */}
        {dataSource === 'scraping' && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">
              Modo Scraping Activo
            </h4>
            <p className="text-sm text-yellow-800">
              Los datos mostrados provienen de web scraping debido a limitaciones 
              en los requests de la API. La información se actualiza cada 5 minutos.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
