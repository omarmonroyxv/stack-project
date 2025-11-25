import Layout from '../components/Layout';

export default function TerminosCondiciones() {
  return (
    <Layout>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', lineHeight: '1.8' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#333' }}>Términos y Condiciones</h1>
        <p style={{ color: '#666', marginBottom: '40px' }}><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}</p>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>1. Aceptación de los Términos</h2>
          <p>
            Al acceder y utilizar <strong>StackLive</strong> (en adelante, "el Sitio"), aceptas estar sujeto a estos
            Términos y Condiciones. Si no estás de acuerdo con alguno de estos términos, no utilices este sitio web.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>2. Uso del Sitio</h2>
          <p style={{ marginBottom: '15px' }}>
            El contenido de este sitio web es únicamente para información general y uso personal.
            Está sujeto a cambios sin previo aviso.
          </p>
          <p style={{ marginBottom: '15px' }}><strong>Te comprometes a:</strong></p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li>Utilizar el sitio de manera legal y conforme a estos términos</li>
            <li>No utilizar el sitio para actividades fraudulentas o ilegales</li>
            <li>No intentar acceder a áreas restringidas del sitio</li>
            <li>No distribuir virus, malware o código malicioso</li>
            <li>No realizar scraping o extracción masiva de contenido sin autorización</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>3. Propiedad Intelectual</h2>
          <p style={{ marginBottom: '15px' }}>
            Todo el contenido publicado en <strong>StackLive</strong>, incluyendo textos, imágenes, logos, gráficos,
            y código fuente, está protegido por derechos de autor y otras leyes de propiedad intelectual.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Excepciones:</strong> Las imágenes y contenido de terceros (equipos de fútbol, jugadores, ligas)
            son propiedad de sus respectivos dueños y se utilizan únicamente con fines informativos y educativos.
          </p>
          <p>
            Queda prohibida la reproducción, distribución o modificación del contenido sin autorización previa por escrito.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>4. Contenido de Usuario</h2>
          <p style={{ marginBottom: '15px' }}>
            Si el sitio permite comentarios o contribuciones de usuarios en el futuro, te comprometes a:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li>No publicar contenido ofensivo, difamatorio o ilegal</li>
            <li>No infringir derechos de autor o propiedad intelectual de terceros</li>
            <li>No realizar spam o publicidad no autorizada</li>
            <li>Ser responsable del contenido que publiques</li>
          </ul>
          <p>
            Nos reservamos el derecho de eliminar cualquier contenido que viole estos términos.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>5. Enlaces a Sitios Externos</h2>
          <p style={{ marginBottom: '15px' }}>
            Nuestro sitio puede contener enlaces a sitios web de terceros. Estos enlaces se proporcionan
            únicamente para tu conveniencia.
          </p>
          <p>
            No tenemos control sobre el contenido de estos sitios y no asumimos responsabilidad por ellos.
            La inclusión de un enlace no implica respaldo del sitio enlazado.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>6. Publicidad</h2>
          <p style={{ marginBottom: '15px' }}>
            Este sitio muestra publicidad de terceros a través de <strong>Google AdSense</strong> y <strong>Ezoic</strong>.
          </p>
          <p style={{ marginBottom: '15px' }}>
            Los anunciantes son responsables de garantizar que el material enviado para su inclusión cumple
            con todas las leyes aplicables. No seremos responsables por errores en anuncios.
          </p>
          <p>
            La publicidad mostrada no constituye un respaldo o recomendación de los productos o servicios anunciados.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>7. Exención de Garantías</h2>
          <p style={{ marginBottom: '15px' }}>
            El sitio se proporciona "tal cual" sin garantías de ningún tipo, expresas o implícitas.
          </p>
          <p style={{ marginBottom: '15px' }}><strong>No garantizamos:</strong></p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li>La exactitud, integridad o actualización del contenido</li>
            <li>Que el sitio esté libre de errores o virus</li>
            <li>Que el servicio sea ininterrumpido o seguro</li>
            <li>Los resultados que puedas obtener del uso del sitio</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>8. Limitación de Responsabilidad</h2>
          <p style={{ marginBottom: '15px' }}>
            En la máxima medida permitida por la ley, <strong>StackLive</strong> no será responsable de:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li>Daños directos, indirectos, incidentales o consecuentes</li>
            <li>Pérdida de beneficios, datos o uso</li>
            <li>Interrupciones del servicio</li>
            <li>Contenido de sitios web enlazados</li>
            <li>Acciones basadas en la información del sitio</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>9. Información Deportiva</h2>
          <p>
            La información deportiva (resultados, estadísticas, noticias) se proporciona únicamente con fines
            informativos y de entretenimiento. No garantizamos su exactitud o actualización en tiempo real.
            No nos hacemos responsables de decisiones tomadas basándose en esta información.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>10. Modificaciones del Servicio</h2>
          <p>
            Nos reservamos el derecho de modificar, suspender o descontinuar cualquier aspecto del sitio
            en cualquier momento sin previo aviso. No seremos responsables ante ti o terceros por cualquier
            modificación, suspensión o discontinuación del servicio.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>11. Ley Aplicable y Jurisdicción</h2>
          <p>
            Estos Términos y Condiciones se rigen por las leyes aplicables sin tener en cuenta conflictos
            de disposiciones legales. Cualquier disputa será resuelta en los tribunales competentes.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>12. Modificaciones de los Términos</h2>
          <p>
            Podemos revisar estos términos en cualquier momento actualizando esta página. Al continuar
            usando el sitio después de cambios, aceptas los términos modificados. Te recomendamos revisar
            esta página periódicamente.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>13. Divisibilidad</h2>
          <p>
            Si alguna disposición de estos términos se considera inválida o inaplicable, las disposiciones
            restantes continuarán en pleno vigor y efecto.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>14. Contacto</h2>
          <p>
            Si tienes preguntas sobre estos Términos y Condiciones, contáctanos en:{' '}
            <a href="/contacto" style={{ color: '#4285f4' }}>Página de Contacto</a>
          </p>
        </section>
      </div>
    </Layout>
  );
}
