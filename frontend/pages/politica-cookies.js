import Layout from '../components/Layout';

export default function PoliticaCookies() {
  return (
    <Layout>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', lineHeight: '1.8' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#333' }}>Política de Cookies</h1>
        <p style={{ color: '#666', marginBottom: '40px' }}><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}</p>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>¿Qué son las Cookies?</h2>
          <p style={{ marginBottom: '15px' }}>
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tablet o móvil)
            cuando visitas un sitio web. Permiten que el sitio web recuerde tus acciones y preferencias durante un
            período de tiempo.
          </p>
          <p>
            En <strong>StackLive</strong> utilizamos cookies para mejorar tu experiencia de navegación, analizar el
            tráfico del sitio y mostrar publicidad relevante.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>Tipos de Cookies que Utilizamos</h2>

          <h3 style={{ fontSize: '1.4em', marginBottom: '10px', marginTop: '25px', color: '#333' }}>1. Cookies Estrictamente Necesarias</h3>
          <p style={{ marginBottom: '15px' }}>
            Estas cookies son esenciales para el funcionamiento del sitio web y no pueden ser desactivadas.
            Generalmente se establecen en respuesta a acciones realizadas por ti, como establecer preferencias de privacidad.
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Cookie</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Propósito</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>session_id</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>Mantener tu sesión activa</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>Sesión</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ fontSize: '1.4em', marginBottom: '10px', marginTop: '25px', color: '#333' }}>2. Cookies de Rendimiento y Analíticas</h3>
          <p style={{ marginBottom: '15px' }}>
            Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web, proporcionando información
            sobre las áreas visitadas, el tiempo de permanencia y problemas encontrados.
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Proveedor</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Cookie</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Propósito</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>Google Analytics</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>_ga</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>Distinguir usuarios</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>2 años</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>Google Analytics</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>_gid</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>Distinguir usuarios</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>24 horas</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>Google Analytics</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>_gat</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>Limitar frecuencia de solicitudes</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>1 minuto</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ fontSize: '1.4em', marginBottom: '10px', marginTop: '25px', color: '#333' }}>3. Cookies de Publicidad</h3>
          <p style={{ marginBottom: '15px' }}>
            Estas cookies son utilizadas por redes publicitarias para mostrar anuncios relevantes basados en tus intereses.
            También limitan el número de veces que ves un anuncio y ayudan a medir la efectividad de las campañas publicitarias.
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Proveedor</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Propósito</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>Google AdSense</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>Mostrar anuncios personalizados</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>Hasta 2 años</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>Ezoic</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>Optimización de anuncios y contenido</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>Hasta 1 año</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>Cookies de Terceros</h2>
          <p style={{ marginBottom: '15px' }}>
            Utilizamos servicios de terceros que pueden establecer sus propias cookies:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li style={{ marginBottom: '10px' }}>
              <strong>Google Analytics:</strong> Para analizar el uso del sitio web.{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#4285f4' }}>
                Política de Privacidad
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Google AdSense:</strong> Para mostrar publicidad relevante.{' '}
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#4285f4' }}>
                Información sobre Anuncios
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Ezoic:</strong> Para optimización de anuncios.{' '}
              <a href="https://www.ezoic.com/privacy-policy/" target="_blank" rel="noopener noreferrer" style={{ color: '#4285f4' }}>
                Política de Privacidad
              </a>
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>Cómo Gestionar las Cookies</h2>
          <p style={{ marginBottom: '15px' }}>
            Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las cookies que ya están
            en tu dispositivo y configurar la mayoría de los navegadores para que no las acepten.
          </p>

          <h3 style={{ fontSize: '1.4em', marginBottom: '10px', marginTop: '25px', color: '#333' }}>Configuración por Navegador:</h3>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li style={{ marginBottom: '10px' }}>
              <strong>Chrome:</strong>{' '}
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: '#4285f4' }}>
                Gestionar cookies en Chrome
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Firefox:</strong>{' '}
              <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" style={{ color: '#4285f4' }}>
                Gestionar cookies en Firefox
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Safari:</strong>{' '}
              <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: '#4285f4' }}>
                Gestionar cookies en Safari
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Edge:</strong>{' '}
              <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" style={{ color: '#4285f4' }}>
                Gestionar cookies en Edge
              </a>
            </li>
          </ul>

          <p style={{ marginBottom: '15px', backgroundColor: '#fff3cd', padding: '15px', borderLeft: '4px solid #ffc107' }}>
            <strong>⚠️ Nota importante:</strong> Si decides deshabilitar las cookies, es posible que algunas funcionalidades
            del sitio web no funcionen correctamente.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>Publicidad Personalizada</h2>
          <p style={{ marginBottom: '15px' }}>
            Puedes optar por no recibir publicidad personalizada de Google visitando:{' '}
            <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#4285f4' }}>
              Configuración de Anuncios de Google
            </a>
          </p>
          <p>
            Para más opciones de exclusión de publicidad personalizada, visita:{' '}
            <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#4285f4' }}>
              Your Online Choices
            </a>
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>Más Información</h2>
          <p style={{ marginBottom: '15px' }}>
            Para obtener más información sobre cómo utilizamos las cookies y tus datos personales, consulta nuestra{' '}
            <a href="/politica-privacidad" style={{ color: '#4285f4' }}>Política de Privacidad</a>.
          </p>
          <p>
            Si tienes alguna pregunta sobre el uso de cookies en este sitio web, contáctanos en:{' '}
            <a href="/contacto" style={{ color: '#4285f4' }}>Página de Contacto</a>
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>Cambios en esta Política</h2>
          <p>
            Podemos actualizar esta Política de Cookies periódicamente. Te recomendamos revisar esta página
            regularmente para estar informado sobre cómo utilizamos las cookies.
          </p>
        </section>
      </div>
    </Layout>
  );
}
