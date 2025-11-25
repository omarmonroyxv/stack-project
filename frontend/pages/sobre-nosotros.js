import Layout from '../components/Layout';

export default function SobreNosotros() {
  return (
    <Layout>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', lineHeight: '1.8' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: '#333', textAlign: 'center' }}>Sobre Nosotros</h1>

        <div style={{
          textAlign: 'center',
          marginBottom: '50px',
          padding: '30px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <p style={{ fontSize: '1.3em', color: '#555', fontWeight: '500', lineHeight: '1.8' }}>
            Bienvenido a <strong style={{ color: '#007bff' }}>StackLive</strong>, tu fuente confiable de
            noticias, análisis y contenido exclusivo sobre el mundo del fútbol.
          </p>
        </div>

        <section style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>Nuestra Misión</h2>
          <p style={{ marginBottom: '20px', color: '#555', fontSize: '1.1em' }}>
            En <strong>StackLive</strong> nos apasiona el fútbol y creemos que los aficionados merecen
            información de calidad, actualizada y confiable. Nuestra misión es mantener a nuestra comunidad
            informada sobre todo lo que sucede en el mundo del deporte rey.
          </p>
          <p style={{ color: '#555', fontSize: '1.1em' }}>
            Nos esforzamos por ofrecer cobertura completa de las principales ligas, competiciones internacionales,
            fichajes, estadísticas y todo lo que un verdadero aficionado necesita saber.
          </p>
        </section>

        <section style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>¿Qué Ofrecemos?</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '25px',
            marginBottom: '30px'
          }} className="md:grid-cols-2">
            <div style={{
              padding: '25px',
              backgroundColor: '#fff',
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ fontSize: '1.4em', marginBottom: '12px', color: '#007bff' }}>
                📰 Noticias de Última Hora
              </h3>
              <p style={{ color: '#666', lineHeight: '1.7' }}>
                Cobertura al minuto de los acontecimientos más importantes del mundo del fútbol,
                fichajes, lesiones y declaraciones.
              </p>
            </div>

            <div style={{
              padding: '25px',
              backgroundColor: '#fff',
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ fontSize: '1.4em', marginBottom: '12px', color: '#007bff' }}>
                📊 Análisis y Estadísticas
              </h3>
              <p style={{ color: '#666', lineHeight: '1.7' }}>
                Análisis profundos de partidos, tácticas, rendimiento de jugadores y estadísticas
                detalladas que te ayudan a entender mejor el juego.
              </p>
            </div>

            <div style={{
              padding: '25px',
              backgroundColor: '#fff',
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ fontSize: '1.4em', marginBottom: '12px', color: '#007bff' }}>
                🏆 Cobertura de Ligas
              </h3>
              <p style={{ color: '#666', lineHeight: '1.7' }}>
                Seguimiento completo de las principales ligas europeas y competiciones internacionales
                como Champions League, Europa League y mundiales.
              </p>
            </div>

            <div style={{
              padding: '25px',
              backgroundColor: '#fff',
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ fontSize: '1.4em', marginBottom: '12px', color: '#007bff' }}>
                💬 Opinión y Debate
              </h3>
              <p style={{ color: '#666', lineHeight: '1.7' }}>
                Artículos de opinión, columnas y análisis de expertos que generan conversación
                y debate entre los aficionados.
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>Nuestros Valores</h2>

          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ fontSize: '1.4em', marginBottom: '10px', color: '#555' }}>
              ✓ Credibilidad
            </h3>
            <p style={{ color: '#666', paddingLeft: '20px', lineHeight: '1.7' }}>
              Verificamos nuestras fuentes y nos comprometemos a ofrecer información veraz y contrastada.
              La confianza de nuestros lectores es nuestra prioridad.
            </p>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ fontSize: '1.4em', marginBottom: '10px', color: '#555' }}>
              ✓ Actualidad
            </h3>
            <p style={{ color: '#666', paddingLeft: '20px', lineHeight: '1.7' }}>
              Mantenemos nuestro contenido constantemente actualizado para que nunca te pierdas
              ninguna noticia importante del mundo del fútbol.
            </p>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ fontSize: '1.4em', marginBottom: '10px', color: '#555' }}>
              ✓ Pasión
            </h3>
            <p style={{ color: '#666', paddingLeft: '20px', lineHeight: '1.7' }}>
              Somos aficionados como tú. Nuestra pasión por el fútbol se refleja en cada artículo,
              análisis y noticia que publicamos.
            </p>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ fontSize: '1.4em', marginBottom: '10px', color: '#555' }}>
              ✓ Comunidad
            </h3>
            <p style={{ color: '#666', paddingLeft: '20px', lineHeight: '1.7' }}>
              Creemos en construir una comunidad de aficionados donde todos puedan compartir
              su amor por el fútbol y disfrutar del contenido de calidad.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>Nuestro Compromiso</h2>
          <p style={{ marginBottom: '20px', color: '#555', fontSize: '1.1em' }}>
            En <strong>StackLive</strong> nos comprometemos a:
          </p>
          <ul style={{ marginLeft: '30px', color: '#666', fontSize: '1.05em', lineHeight: '2' }}>
            <li>Mantener altos estándares de calidad periodística</li>
            <li>Respetar la privacidad de nuestros usuarios</li>
            <li>Ofrecer una experiencia de navegación segura y agradable</li>
            <li>Escuchar activamente el feedback de nuestra comunidad</li>
            <li>Mejorar constantemente nuestro contenido y servicios</li>
            <li>Ser imparciales y objetivos en nuestra cobertura</li>
          </ul>
        </section>

        <section style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>Únete a Nuestra Comunidad</h2>
          <p style={{ marginBottom: '20px', color: '#555', fontSize: '1.1em' }}>
            <strong>StackLive</strong> es más que un sitio de noticias; es una comunidad de apasionados
            del fútbol. Te invitamos a ser parte de esta experiencia.
          </p>
          <p style={{ color: '#555', fontSize: '1.1em' }}>
            Ya seas hincha de un equipo local, seguidor de las grandes ligas europeas, o simplemente
            un amante del deporte, aquí encontrarás tu lugar. El fútbol nos une a todos.
          </p>
        </section>

        <div style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '40px',
          borderRadius: '8px',
          textAlign: 'center',
          marginBottom: '50px'
        }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '15px' }}>¿Tienes Preguntas?</h2>
          <p style={{ fontSize: '1.1em', marginBottom: '25px', lineHeight: '1.7' }}>
            Nos encantaría saber de ti. Si tienes preguntas, sugerencias o simplemente
            quieres saludarnos, no dudes en contactarnos.
          </p>
          <a
            href="/contacto"
            style={{
              display: 'inline-block',
              backgroundColor: 'white',
              color: '#007bff',
              padding: '15px 40px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.1em',
              transition: 'transform 0.3s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Contáctanos
          </a>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '30px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <p style={{ fontSize: '1.2em', color: '#333', fontWeight: '500', marginBottom: '10px' }}>
            Gracias por ser parte de StackLive
          </p>
          <p style={{ color: '#666' }}>
            Juntos hacemos que el fútbol sea aún más emocionante
          </p>
        </div>
      </div>
    </Layout>
  );
}
