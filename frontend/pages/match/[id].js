import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { fixturesApi } from '../../lib/api';
import { formatTime, formatDate, getMatchStatus, isMatchLive } from '../../lib/utils';
import { FiClock, FiMapPin, FiUsers, FiActivity } from 'react-icons/fi';

export default function MatchDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-8">
        <div className="container-custom">
          {/* League Info */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            {league?.logo && (
              <img src={league.logo} alt={league.name} className="w-8 h-8" />
            )}
            <span className="text-lg font-semibold">{league?.name}</span>
          </div>

          {/* Match Status */}
          <div className="text-center mb-6">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
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
          <div className="grid grid-cols-3 gap-8 items-center max-w-4xl mx-auto">
            {/* Home Team */}
            <div className="text-center">
              {teams?.home?.logo && (
                <img
                  src={teams.home.logo}
                  alt={teams.home.name}
                  className="w-24 h-24 mx-auto mb-4"
                />
              )}
              <h2 className="text-2xl font-bold">{teams?.home?.name}</h2>
            </div>

            {/* Score */}
            <div className="text-center">
              <div className="text-6xl font-bold">
                {goals?.home ?? 0} - {goals?.away ?? 0}
              </div>
              {fixture?.status?.short === 'NS' && fixture?.date && (
                <div className="mt-4 text-primary-100">
                  <FiClock className="inline mr-2" />
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
                  className="w-24 h-24 mx-auto mb-4"
                />
              )}
              <h2 className="text-2xl font-bold">{teams?.away?.name}</h2>
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

        {/* Estadísticas del Partido */}
{match.statistics && match.statistics.length > 0 && (
  <div className="mt-8">
    <h2 className="text-2xl font-bold mb-6">📊 Estadísticas del Partido</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {match.statistics.map((teamStats, idx) => (
        <div key={idx} className="card p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            {teamStats.team?.logo && (
              <img src={teamStats.team.logo} alt={teamStats.team.name} className="w-8 h-8 mr-2" />
            )}
            {teamStats.team?.name}
          </h3>
          <div className="space-y-3">
            {teamStats.statistics?.map((stat, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{stat.type}</span>
                  <span className="font-semibold">{stat.value}</span>
                </div>
                {stat.value && typeof stat.value === 'number' && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full"
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