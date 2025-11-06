import Link from 'next/link';
import { formatTime, getMatchStatus, isMatchLive, getStatusBadgeClass } from '../lib/utils';
import { FiClock } from 'react-icons/fi';

export default function MatchCard({ match, source = 'api' }) {
  // Adaptar datos según la fuente (API o scraping)
  const getMatchData = () => {
    if (source === 'api') {
      return {
        id: match.fixture?.id,
        homeTeam: match.teams?.home?.name || 'TBD',
        awayTeam: match.teams?.away?.name || 'TBD',
        homeLogo: match.teams?.home?.logo,
        awayLogo: match.teams?.away?.logo,
        homeScore: match.goals?.home ?? '-',
        awayScore: match.goals?.away ?? '-',
        status: match.fixture?.status?.short || 'NS',
        elapsed: match.fixture?.status?.elapsed,
        league: match.league?.name,
        leagueLogo: match.league?.logo,
        date: match.fixture?.date,
        venue: match.fixture?.venue?.name
      };
    } else {
      // Datos del scraping
      return {
        homeTeam: match.homeTeam || 'TBD',
        awayTeam: match.awayTeam || 'TBD',
        score: match.score || '- : -',
        status: match.status || 'LIVE',
        time: match.time
      };
    }
  };

  const data = getMatchData();
  const live = isMatchLive(data.status);

  if (source === 'scraping') {
    return (
      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <span className={getStatusBadgeClass(data.status)}>
            {live && <span className="w-2 h-2 bg-red-500 rounded-full mr-2 live-indicator" />}
            {getMatchStatus(data.status)}
          </span>
          <span className="text-sm text-gray-500">{data.time}</span>
        </div>

        <div className="space-y-3">
          {/* Home Team */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">{data.homeTeam}</span>
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">{data.awayTeam}</span>
          </div>
        </div>

        <div className="mt-4 text-center">
          <span className="text-2xl font-bold text-gray-900">{data.score}</span>
          <p className="text-xs text-gray-500 mt-1">Datos de scraping</p>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/match/${data.id}`}>
      <div className="card p-4 cursor-pointer hover:scale-[1.02] transition-transform">
        {/* Header con liga y estado */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {data.leagueLogo && (
              <img src={data.leagueLogo} alt={data.league} className="w-5 h-5" />
            )}
            <span className="text-xs text-gray-600 font-medium">{data.league}</span>
          </div>
          <span className={getStatusBadgeClass(data.status)}>
            {live && <span className="w-2 h-2 bg-red-500 rounded-full mr-2 live-indicator" />}
            {getMatchStatus(data.status)}
            {live && data.elapsed && ` ${data.elapsed}'`}
          </span>
        </div>

        {/* Teams and Score */}
        <div className="space-y-3">
          {/* Home Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              {data.homeLogo && (
                <img src={data.homeLogo} alt={data.homeTeam} className="w-8 h-8" />
              )}
              <span className="font-semibold text-gray-900">{data.homeTeam}</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 ml-4">
              {data.homeScore}
            </span>
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              {data.awayLogo && (
                <img src={data.awayLogo} alt={data.awayTeam} className="w-8 h-8" />
              )}
              <span className="font-semibold text-gray-900">{data.awayTeam}</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 ml-4">
              {data.awayScore}
            </span>
          </div>
        </div>

        {/* Footer con hora/venue */}
        {data.date && !live && (
          <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
            <FiClock className="w-4 h-4 mr-1" />
            {formatTime(data.date)}
          </div>
        )}

        {data.venue && (
          <div className="mt-2 text-center text-xs text-gray-500">
            {data.venue}
          </div>
        )}
      </div>
    </Link>
  );
}
