import Layout from '../components/Layout';

export default function PoliticaPrivacidad() {
  return (
    <Layout>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', lineHeight: '1.8' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#333' }}>Política de Privacidad</h1>
        <p style={{ color: '#666', marginBottom: '40px' }}><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}</p>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>1. Información que Recopilamos</h2>
          <p style={{ marginBottom: '15px' }}>
            En <strong>StackLive</strong> recopilamos información cuando visitas nuestro sitio web:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li><strong>Información de navegación:</strong> Dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia.</li>
            <li><strong>Cookies:</strong> Utilizamos cookies para mejorar tu experiencia de navegación y mostrar publicidad relevante.</li>
            <li><strong>Información de contacto:</strong> Si nos contactas voluntariamente, recopilamos tu nombre y correo electrónico.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>2. Uso de la Información</h2>
          <p style={{ marginBottom: '15px' }}>Utilizamos la información recopilada para:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li>Mejorar la experiencia del usuario en nuestro sitio web</li>
            <li>Analizar el tráfico y las tendencias mediante Google Analytics</li>
            <li>Mostrar publicidad personalizada a través de Google AdSense y Ezoic</li>
            <li>Responder a consultas y comentarios</li>
            <li>Cumplir con requisitos legales</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>3. Cookies y Tecnologías Similares</h2>
          <p style={{ marginBottom: '15px' }}>
            Utilizamos cookies propias y de terceros para analizar el tráfico web y personalizar el contenido.
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo.
          </p>
          <p style={{ marginBottom: '15px' }}><strong>Cookies de terceros:</strong></p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li><strong>Google Analytics:</strong> Para análisis de tráfico y estadísticas</li>
            <li><strong>Google AdSense:</strong> Para mostrar publicidad relevante</li>
            <li><strong>Ezoic:</strong> Para optimización de anuncios y experiencia del usuario</li>
          </ul>
          <p>
            Puedes configurar tu navegador para rechazar cookies, pero esto puede afectar la funcionalidad del sitio.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>4. Publicidad de Terceros</h2>
          <p style={{ marginBottom: '15px' }}>
            Trabajamos con redes publicitarias de terceros como <strong>Google AdSense</strong> y <strong>Ezoic</strong>
            que pueden utilizar cookies y tecnologías similares para mostrar anuncios basados en tus intereses.
          </p>
          <p style={{ marginBottom: '15px' }}>
            Estas empresas pueden recopilar información sobre tus visitas a este y otros sitios web para proporcionar
            publicidad relevante. Para más información sobre cómo Google utiliza los datos, visita:
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={{ color: '#4285f4' }}>
              Políticas de Privacidad de Google
            </a>
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>5. Compartir Información con Terceros</h2>
          <p style={{ marginBottom: '15px' }}>
            No vendemos ni compartimos tu información personal con terceros, excepto:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li>Con proveedores de servicios (Google Analytics, AdSense, Ezoic) para operaciones del sitio</li>
            <li>Cuando sea requerido por ley o autoridades competentes</li>
            <li>Para proteger nuestros derechos legales</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>6. Seguridad de los Datos</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra
            acceso no autorizado, pérdida o alteración. Sin embargo, ningún método de transmisión por Internet
            es 100% seguro.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>7. Tus Derechos</h2>
          <p style={{ marginBottom: '15px' }}>Tienes derecho a:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li>Acceder a tu información personal</li>
            <li>Solicitar la corrección de datos inexactos</li>
            <li>Solicitar la eliminación de tus datos</li>
            <li>Oponerte al procesamiento de tus datos</li>
            <li>Retirar tu consentimiento en cualquier momento</li>
          </ul>
          <p>
            Para ejercer estos derechos, contáctanos a través de nuestra <a href="/contacto" style={{ color: '#4285f4' }}>página de contacto</a>.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>8. Enlaces a Sitios Externos</h2>
          <p>
            Nuestro sitio puede contener enlaces a sitios web externos. No somos responsables de las prácticas
            de privacidad de estos sitios. Te recomendamos leer sus políticas de privacidad.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>9. Menores de Edad</h2>
          <p>
            Nuestro sitio no está dirigido a menores de 13 años. No recopilamos intencionalmente información
            de menores. Si eres padre o tutor y crees que tu hijo nos ha proporcionado información, contáctanos.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>10. Cambios a esta Política</h2>
          <p>
            Podemos actualizar esta política periódicamente. Te notificaremos de cambios significativos
            publicando la nueva política en esta página con una fecha de actualización.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>11. Contacto</h2>
          <p>
            Si tienes preguntas sobre esta Política de Privacidad, contáctanos en:{' '}
            <a href="/contacto" style={{ color: '#4285f4' }}>Página de Contacto</a>
          </p>
        </section>
      </div>
    </Layout>
  );
}
