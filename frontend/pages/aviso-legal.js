import Layout from '../components/Layout';

export default function AvisoLegal() {
  return (
    <Layout>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', lineHeight: '1.8' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#333' }}>Aviso Legal</h1>
        <p style={{ color: '#666', marginBottom: '40px' }}><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}</p>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>1. Datos Identificativos</h2>
          <p style={{ marginBottom: '15px' }}>
            En cumplimiento con el deber de información recogido en la legislación aplicable sobre servicios
            de la sociedad de la información y comercio electrónico, a continuación se reflejan los siguientes datos:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'none' }}>
            <li style={{ marginBottom: '10px' }}><strong>Denominación social:</strong> StackLive</li>
            <li style={{ marginBottom: '10px' }}><strong>Nombre comercial:</strong> StackLive</li>
            <li style={{ marginBottom: '10px' }}><strong>Dominio:</strong> stacklive.site</li>
            <li style={{ marginBottom: '10px' }}><strong>Actividad:</strong> Portal de noticias deportivas y de fútbol</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>2. Objeto</h2>
          <p style={{ marginBottom: '15px' }}>
            El titular del sitio web, en adelante <strong>StackLive</strong>, pone a disposición de los usuarios
            el presente documento con el que pretende dar cumplimiento a las obligaciones dispuestas en la
            legislación vigente, así como informar a todos los usuarios del sitio web respecto a cuáles son
            las condiciones de uso.
          </p>
          <p>
            Toda persona que acceda a este sitio web asume el papel de usuario, comprometiéndose a la observancia
            y cumplimiento riguroso de las disposiciones aquí dispuestas, así como a cualquier otra disposición
            legal que fuera de aplicación.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>3. Finalidad del Sitio Web</h2>
          <p style={{ marginBottom: '15px' }}>
            <strong>StackLive</strong> es un portal informativo dedicado a:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li>Publicación de noticias y artículos sobre fútbol y deportes</li>
            <li>Información sobre resultados, clasificaciones y estadísticas deportivas</li>
            <li>Análisis y opinión sobre eventos deportivos</li>
            <li>Contenido multimedia relacionado con el mundo del fútbol</li>
          </ul>
          <p>
            El sitio web tiene carácter exclusivamente informativo y de entretenimiento.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>4. Condiciones de Acceso y Uso</h2>
          <p style={{ marginBottom: '15px' }}>
            El acceso al sitio web es gratuito y no requiere registro previo, salvo para funcionalidades
            específicas que puedan implementarse en el futuro.
          </p>
          <p style={{ marginBottom: '15px' }}><strong>El usuario se compromete a:</strong></p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li>Hacer un uso adecuado y lícito del sitio web</li>
            <li>No utilizar el sitio con fines ilícitos o contrarios a lo establecido en este aviso legal</li>
            <li>No realizar acciones que puedan dañar, inutilizar o sobrecargar el sitio web</li>
            <li>No introducir virus, código malicioso o tecnologías que puedan dañar el sitio</li>
            <li>No intentar acceder a áreas restringidas del sistema</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>5. Propiedad Intelectual e Industrial</h2>
          <p style={{ marginBottom: '15px' }}>
            El sitio web, incluyendo a título enunciativo pero no limitativo su programación, edición, compilación
            y demás elementos necesarios para su funcionamiento, los diseños, logotipos, texto y/o gráficos, son
            propiedad de <strong>StackLive</strong> o, en su caso, dispone de licencia o autorización expresa por
            parte de los autores.
          </p>
          <p style={{ marginBottom: '15px' }}>
            Todos los contenidos del sitio web se encuentran debidamente protegidos por la normativa de propiedad
            intelectual e industrial.
          </p>
          <p style={{ marginBottom: '15px' }}><strong>Queda expresamente prohibido:</strong></p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li>La reproducción, distribución, transmisión, adaptación o modificación del contenido sin autorización</li>
            <li>Cualquier forma de explotación comercial sin permiso expreso</li>
            <li>El uso de contenido del sitio en otros sitios web sin autorización</li>
            <li>La eliminación de marcas de agua, logotipos o avisos de derechos de autor</li>
          </ul>
          <p>
            El acceso al sitio web no otorga a los usuarios derecho alguno de propiedad sobre los contenidos.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>6. Contenido de Terceros</h2>
          <p style={{ marginBottom: '15px' }}>
            El sitio web puede incluir contenido de terceros como:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li>Imágenes de equipos, jugadores, estadios y competiciones deportivas</li>
            <li>Logotipos y marcas registradas de clubes, federaciones y organizaciones deportivas</li>
            <li>Enlaces a sitios web externos</li>
            <li>Publicidad de terceros</li>
          </ul>
          <p style={{ marginBottom: '15px' }}>
            <strong>StackLive</strong> reconoce los derechos de propiedad intelectual e industrial de terceros y
            utiliza este contenido únicamente con fines informativos, educativos y de comentario bajo el principio
            de uso legítimo.
          </p>
          <p>
            Si eres titular de derechos y consideras que algún contenido infringe tus derechos, contáctanos para
            su revisión y posible retirada.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>7. Exclusión de Garantías y Responsabilidad</h2>
          <p style={{ marginBottom: '15px' }}>
            <strong>StackLive</strong> no se hace responsable de:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li>La continuidad, disponibilidad y utilidad del sitio web</li>
            <li>Errores, inexactitudes u omisiones en el contenido informativo</li>
            <li>Daños y perjuicios causados por fallos técnicos o errores en el software</li>
            <li>La ausencia de virus u otros elementos dañinos en el sitio web o el servidor</li>
            <li>El uso ilícito o indebido del sitio web por parte de los usuarios</li>
            <li>El contenido de sitios web enlazados</li>
            <li>Decisiones tomadas basándose en la información del sitio</li>
          </ul>
          <p>
            La información deportiva se proporciona tal cual y puede contener errores o no estar actualizada en tiempo real.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>8. Publicidad</h2>
          <p style={{ marginBottom: '15px' }}>
            El sitio web incluye espacios publicitarios gestionados por terceros:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li><strong>Google AdSense:</strong> Red publicitaria de Google</li>
            <li><strong>Ezoic:</strong> Plataforma de optimización de anuncios</li>
          </ul>
          <p style={{ marginBottom: '15px' }}>
            <strong>StackLive</strong> no controla el contenido de los anuncios mostrados y no se hace responsable
            de los productos, servicios o contenidos publicitarios de terceros.
          </p>
          <p>
            Los anunciantes son los únicos responsables de asegurar que el material enviado cumple con todas
            las leyes aplicables.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>9. Enlaces Externos</h2>
          <p style={{ marginBottom: '15px' }}>
            El sitio web puede contener enlaces a otros sitios de interés. Una vez que hagas clic en estos enlaces
            y abandones nuestra página, ya no tenemos control sobre el sitio al que te redirige.
          </p>
          <p>
            Por lo tanto, no podemos responsabilizarnos de la protección y privacidad de la información que
            proporciones mientras visitas dichos sitios.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>10. Protección de Datos</h2>
          <p>
            Para información sobre el tratamiento de datos personales, consulta nuestra{' '}
            <a href="/politica-privacidad" style={{ color: '#4285f4' }}>Política de Privacidad</a> y{' '}
            <a href="/politica-cookies" style={{ color: '#4285f4' }}>Política de Cookies</a>.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>11. Modificaciones</h2>
          <p>
            <strong>StackLive</strong> se reserva el derecho de efectuar sin previo aviso las modificaciones
            que considere oportunas en su sitio web, pudiendo cambiar, suprimir o añadir tanto los contenidos
            y servicios que se presten a través del mismo como la forma en la que éstos aparezcan presentados
            o localizados.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>12. Legislación Aplicable y Jurisdicción</h2>
          <p style={{ marginBottom: '15px' }}>
            La relación entre <strong>StackLive</strong> y el usuario se regirá por la normativa vigente y aplicable.
          </p>
          <p>
            Para la resolución de cualquier controversia las partes se someterán a los Juzgados y Tribunales
            que correspondan conforme a derecho.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#333' }}>13. Contacto</h2>
          <p>
            Para cualquier consulta relacionada con este Aviso Legal, puedes contactarnos a través de:{' '}
            <a href="/contacto" style={{ color: '#4285f4' }}>Página de Contacto</a>
          </p>
        </section>
      </div>
    </Layout>
  );
}
