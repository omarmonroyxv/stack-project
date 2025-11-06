import { useEffect } from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';

export default function WidgetsPage() {
  useEffect(() => {
    // Cargar el script de widgets de API-Sports
    const script = document.createElement('script');
    script.src = 'https://widgets.api-sports.io/2.0.3/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Limpiar el script cuando el componente se desmonte
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <Layout
      title="Estadísticas y Widgets"
      description="Estadísticas detalladas de fútbol con widgets interactivos"
    >
      <Head>
        {/* Styles de los widgets */}
        <link
          href="https://widgets.api-sports.io/2.0.3/widgets.css"
          rel="stylesheet"
        />
      </Head>

      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Estadísticas y Widgets en Vivo
        </h1>

        {/* Widget de Partidos en Vivo */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">⚽ Marcadores en Vivo</h2>
          <div className="card overflow-hidden">
            <div
              id="wg-api-football-game"
              data-host="v3.football.api-sports.io"
              data-key={process.env.NEXT_PUBLIC_API_SPORTS_KEY}
              data-date=""
              data-league=""
              data-season=""
              data-theme="dark"
              data-refresh="15"
              data-show-toolbar="true"
              data-show-errors="false"
              data-show-logos="true"
              data-modal-game="true"
              data-modal-standings="true"
              data-modal-show-logos="true"
            >
            </div>
          </div>
        </div>

        {/* Widget de Clasificaciones - Premier League */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League - Clasificación</h2>
          <div className="card overflow-hidden">
            <div
              id="wg-api-football-standings"
              data-host="v3.football.api-sports.io"
              data-key={process.env.NEXT_PUBLIC_API_SPORTS_KEY}
              data-league="39"
              data-team=""
              data-season="2024"
              data-theme="dark"
              data-show-errors="false"
              data-show-logos="true"
            >
            </div>
          </div>
        </div>

        {/* Widget de Clasificaciones - La Liga */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">🇪🇸 La Liga - Clasificación</h2>
          <div className="card overflow-hidden">
            <div
              id="wg-api-football-standings-laliga"
              data-host="v3.football.api-sports.io"
              data-key={process.env.NEXT_PUBLIC_API_SPORTS_KEY}
              data-league="140"
              data-team=""
              data-season="2024"
              data-theme="dark"
              data-show-errors="false"
              data-show-logos="true"
            >
            </div>
          </div>
        </div>

        {/* Widget de Clasificaciones - Serie A */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">🇮🇹 Serie A - Clasificación</h2>
          <div className="card overflow-hidden">
            <div
              id="wg-api-football-standings-seriea"
              data-host="v3.football.api-sports.io"
              data-key={process.env.NEXT_PUBLIC_API_SPORTS_KEY}
              data-league="135"
              data-team=""
              data-season="2024"
              data-theme="dark"
              data-show-errors="false"
              data-show-logos="true"
            >
            </div>
          </div>
        </div>

        {/* Instrucciones para personalización */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            💡 Personalización
          </h3>
          <p className="text-blue-800 text-sm mb-3">
            Estos widgets se actualizan automáticamente cada 15 segundos y muestran datos en tiempo real.
          </p>
          <p className="text-blue-800 text-sm">
            <strong>IDs de Ligas disponibles:</strong>
          </p>
          <ul className="list-disc list-inside text-blue-800 text-sm mt-2 space-y-1">
            <li>39 - Premier League (Inglaterra)</li>
            <li>140 - La Liga (España)</li>
            <li>135 - Serie A (Italia)</li>
            <li>78 - Bundesliga (Alemania)</li>
            <li>61 - Ligue 1 (Francia)</li>
            <li>2 - UEFA Champions League</li>
            <li>848 - Liga MX (México)</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}