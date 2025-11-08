import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { fixturesApi, blogApi } from '../../lib/api';
import { formatTime, formatDate, getMatchStatus, isMatchLive } from '../../lib/utils';
import { FiClock, FiMapPin, FiUsers, FiActivity, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export default function MatchDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState({ home: 0, away: 0 });
  const [userVote, setUserVote] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  // Load votes from localStorage
  useEffect(() => {
    if (!id) return;
    const savedVote = localStorage.getItem(`vote_${id}`);
    if (savedVote) {
      setUserVote(savedVote);
    }

    // Load votes count
    const savedVotes = localStorage.getItem(`votes_${id}`);
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes));
    } else {
      // Generate random initial votes for demo
      const randomHome = Math.floor(Math.random() * 100) + 50;
      const randomAway = Math.floor(Math.random() * 100) + 50;
      setVotes({ home: randomHome, away: randomAway });
    }
  }, [id]);

  const handleVote = (team) => {
    if (userVote) return; // Already voted

    const newVotes = {
      home: team === 'home' ? votes.home + 1 : votes.home,
      away: team === 'away' ? votes.away + 1 : votes.away
    };

    setVotes(newVotes);
    setUserVote(team);
    localStorage.setItem(`vote_${id}`, team);
    localStorage.setItem(`votes_${id}`, JSON.stringify(newVotes));
  };

  useEffect(() => {
    if (!id) return;

    const fetchMatch = async () => {
      try {
        const res = await fixturesApi.getById(id);
        if (res.data.success) {
          setMatch(res.data.data);
        } else {
          setError('Partido no encontrado');
        }
      } catch (err) {
        setError('Error cargando el partido');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();

    // Fetch related news
    const fetchNews = async () => {
      try {
        const res = await blogApi.getFeaturedPosts();
        if (res.data.success) {
          setRelatedNews(res.data.data.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };

    fetchNews();

    // Auto-refresh cada 30 segundos si el partido está en vivo
    const interval = setInterval(() => {
      if (match && isMatchLive(match.fixture?.status?.short)) {
        fetchMatch();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <Layout title="Cargando...">
        <div className="container-custom py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !match) {
    return (
      <Layout title="Error">
        <div className="container-custom py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || 'Partido no encontrado'}
            </h1>
            <button
              onClick={() => router.back()}
              className="btn-primary"
            >
              Volver
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const { fixture, teams, goals, league, score } = match;
  const live = isMatchLive(fixture?.status?.short);

  return (
    <Layout
      title={`${teams?.home?.name} vs ${teams?.away?.name}`}
      description={`Partido en vivo: ${teams?.home?.name} vs ${teams?.away?.name}`}
    >
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-6 md:py-8">
        <div className="container-custom px-4">
          {/* League Info */}
          <div className="flex items-center justify-center space-x-2 md:space-x-3 mb-4 md:mb-6">
            {league?.logo && (
              <img src={league.logo} alt={league.name} className="w-6 h-6 md:w-8 md:h-8" />
            )}
            <span className="text-sm md:text-lg font-semibold truncate">{league?.name}</span>
          </div>

          {/* Match Status */}
          <div className="text-center mb-4 md:mb-6">
            <span className={`inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold ${
              live
                ? 'bg-red-500 text-white'
                : fixture?.status?.short === 'FT'
                ? 'bg-gray-700 text-white'
                : 'bg-blue-500 text-white'
            }`}>
              {live && <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />}
              {getMatchStatus(fixture?.status?.short)}
              {live && fixture?.status?.elapsed && ` - ${fixture.status.elapsed}'`}
            </span>
          </div>

          {/* Teams and Score */}
          <div className="grid grid-cols-3 gap-2 md:gap-8 items-center max-w-4xl mx-auto">
            {/* Home Team */}
            <div className="text-center">
              {teams?.home?.logo && (
                <img
                  src={teams.home.logo}
                  alt={teams.home.name}
                  className="w-12 h-12 md:w-24 md:h-24 mx-auto mb-2 md:mb-4"
                />
              )}
              <h2 className="text-sm md:text-2xl font-bold leading-tight">{teams?.home?.name}</h2>
            </div>

            {/* Score */}
            <div className="text-center">
              <div className="text-3xl md:text-6xl font-bold">
                {goals?.home ?? 0} - {goals?.away ?? 0}
              </div>
              {fixture?.status?.short === 'NS' && fixture?.date && (
                <div className="mt-2 md:mt-4 text-primary-100 text-xs md:text-base">
                  <FiClock className="inline mr-1 md:mr-2" />
                  {formatTime(fixture.date)}
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="text-center">
              {teams?.away?.logo && (
                <img
                  src={teams.away.logo}
                  alt={teams.away.name}
                  className="w-12 h-12 md:w-24 md:h-24 mx-auto mb-2 md:mb-4"
                />
              )}
              <h2 className="text-sm md:text-2xl font-bold leading-tight">{teams?.away?.name}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Match Details */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Match Info */}
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FiActivity className="mr-2" />
              Información del Partido
            </h3>
            <div className="space-y-3">
              {fixture?.venue?.name && (
                <div className="flex items-center text-gray-600">
                  <FiMapPin className="w-5 h-5 mr-3 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-900">{fixture.venue.name}</p>
                    {fixture.venue.city && (
                      <p className="text-sm">{fixture.venue.city}</p>
                    )}
                  </div>
                </div>
              )}
              {fixture?.date && (
                <div className="flex items-center text-gray-600">
                  <FiClock className="w-5 h-5 mr-3 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {formatDate(fixture.date)}
                    </p>
                    <p className="text-sm">{formatTime(fixture.date)}</p>
                  </div>
                </div>
              )}
              {fixture?.referee && (
                <div className="flex items-center text-gray-600">
                  <FiUsers className="w-5 h-5 mr-3 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-900">Árbitro</p>
                    <p className="text-sm">{fixture.referee}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Statistics (if available) */}
          {score?.halftime && score.halftime.home !== null && score.halftime.home !== undefined && (
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">Marcadores</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Medio Tiempo</span>
                  <span className="font-bold text-lg">
                    {score.halftime.home ?? 0} - {score.halftime.away ?? 0}
                  </span>
                </div>
                {score.fulltime && score.fulltime.home !== null && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tiempo Completo</span>
                    <span className="font-bold text-lg">
                      {score.fulltime.home ?? 0} - {score.fulltime.away ?? 0}
                    </span>
                  </div>
                )}
                {score.extratime && score.extratime.home !== null && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tiempo Extra</span>
                    <span className="font-bold text-lg">
                      {score.extratime.home ?? 0} - {score.extratime.away ?? 0}
                    </span>
                  </div>
                )}
                {score.penalty && score.penalty.home !== null && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Penales</span>
                    <span className="font-bold text-lg">
                      {score.penalty.home ?? 0} - {score.penalty.away ?? 0}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sistema de Votación */}
        <div className="mt-6 md:mt-8 px-4 md:px-0">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">🗳️ ¿Quién ganará?</h2>
          <div className="card p-4 md:p-6">
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
              {/* Botón Equipo Local */}
              <button
                onClick={() => handleVote('home')}
                disabled={userVote !== null}
                className={`p-3 md:p-6 rounded-lg transition-all ${
                  userVote === 'home'
                    ? 'bg-blue-600 text-white ring-2 md:ring-4 ring-blue-300'
                    : userVote
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-100 text-blue-900 hover:bg-blue-200 cursor-pointer active:scale-95'
                }`}
              >
                <div className="flex flex-col items-center">
                  {teams?.home?.logo && (
                    <img src={teams.home.logo} alt={teams.home.name} className="w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-3" />
                  )}
                  <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2 text-center leading-tight">{teams?.home?.name}</h3>
                  {userVote && (
                    <span className="text-xl md:text-2xl font-bold">
                      {Math.round((votes.home / (votes.home + votes.away)) * 100)}%
                    </span>
                  )}
                </div>
              </button>

              {/* Botón Equipo Visitante */}
              <button
                onClick={() => handleVote('away')}
                disabled={userVote !== null}
                className={`p-3 md:p-6 rounded-lg transition-all ${
                  userVote === 'away'
                    ? 'bg-red-600 text-white ring-2 md:ring-4 ring-red-300'
                    : userVote
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-red-100 text-red-900 hover:bg-red-200 cursor-pointer active:scale-95'
                }`}
              >
                <div className="flex flex-col items-center">
                  {teams?.away?.logo && (
                    <img src={teams.away.logo} alt={teams.away.name} className="w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-3" />
                  )}
                  <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2 text-center leading-tight">{teams?.away?.name}</h3>
                  {userVote && (
                    <span className="text-xl md:text-2xl font-bold">
                      {Math.round((votes.away / (votes.home + votes.away)) * 100)}%
                    </span>
                  )}
                </div>
              </button>
            </div>

            {/* Barra de progreso */}
            {userVote && (
              <div className="mt-6">
                <div className="flex h-8 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 flex items-center justify-center text-white text-sm font-semibold"
                    style={{ width: `${(votes.home / (votes.home + votes.away)) * 100}%` }}
                  >
                    {Math.round((votes.home / (votes.home + votes.away)) * 100) > 10 &&
                      `${Math.round((votes.home / (votes.home + votes.away)) * 100)}%`}
                  </div>
                  <div
                    className="bg-red-600 flex items-center justify-center text-white text-sm font-semibold"
                    style={{ width: `${(votes.away / (votes.home + votes.away)) * 100}%` }}
                  >
                    {Math.round((votes.away / (votes.home + votes.away)) * 100) > 10 &&
                      `${Math.round((votes.away / (votes.home + votes.away)) * 100)}%`}
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-3">
                  {votes.home + votes.away} votos totales
                </p>
              </div>
            )}

            {!userVote && (
              <p className="text-center text-gray-600 text-sm">
                Haz clic en un equipo para votar
              </p>
            )}
          </div>
        </div>

        {/* Estadísticas del Partido */}
{match.statistics && match.statistics.length > 0 && (
  <div className="mt-6 md:mt-8 px-4 md:px-0">
    <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">📊 Estadísticas del Partido</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {match.statistics.map((teamStats, idx) => (
        <div key={idx} className="card p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center">
            {teamStats.team?.logo && (
              <img src={teamStats.team.logo} alt={teamStats.team.name} className="w-6 h-6 md:w-8 md:h-8 mr-2" />
            )}
            <span className="truncate">{teamStats.team?.name}</span>
          </h3>
          <div className="space-y-2 md:space-y-3">
            {teamStats.statistics?.map((stat, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs md:text-sm mb-1">
                  <span className="text-gray-600 truncate mr-2">{stat.type}</span>
                  <span className="font-semibold flex-shrink-0">{stat.value}</span>
                </div>
                {stat.value && typeof stat.value === 'number' && (
                  <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                    <div
                      className="bg-primary-600 h-1.5 md:h-2 rounded-full"
                      style={{ width: `${Math.min(stat.value, 100)}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        {/* Noticias Relacionadas */}
        {relatedNews.length > 0 && (
          <div className="mt-6 md:mt-8 px-4 md:px-0">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold">📰 Últimas Noticias</h2>
              <Link href="/blog" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center text-sm md:text-base">
                Ver todas
                <FiArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {relatedNews.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="card overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {post.featuredImage && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-3 md:p-4">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                      <span className="truncate">{post.category}</span>
                      <span>•</span>
                      <span className="whitespace-nowrap">{new Date(post.createdAt).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <h3 className="font-bold text-base md:text-lg mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm line-clamp-2 md:line-clamp-3">
                      {post.excerpt || post.content?.substring(0, 120) + '...'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.back()}
            className="btn-secondary"
          >
            ← Volver a partidos
          </button>
        </div>
      </div>
    </Layout>
  );
}