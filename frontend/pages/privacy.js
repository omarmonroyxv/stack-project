import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <Layout
      title="Política de Privacidad"
      description="Política de privacidad de Stack - Resultados de fútbol en vivo"
    >
      <div className="min-h-screen bg-slate-950 py-12">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              Política de Privacidad
            </h1>
            
            <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
              
              <p className="text-xl text-gray-400 mb-8">
                Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Información que Recopilamos</h2>
                <p className="leading-relaxed">
                  En Stack, recopilamos información limitada para mejorar tu experiencia de navegación:
                </p>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>Datos de navegación (páginas visitadas, tiempo en el sitio)</li>
                  <li>Información del dispositivo (tipo de navegador, sistema operativo)</li>
                  <li>Dirección IP (para análisis de tráfico)</li>
                  <li>Cookies para mejorar la funcionalidad del sitio</li>
                </ul>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Uso de la Información</h2>
                <p className="leading-relaxed">
                  Utilizamos la información recopilada para:
                </p>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>Mejorar el contenido y la experiencia del usuario</li>
                  <li>Analizar tendencias y patrones de uso</li>
                  <li>Personalizar la publicidad (Google AdSense)</li>
                  <li>Mantener la seguridad del sitio</li>
                </ul>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. Cookies</h2>
                <p className="leading-relaxed">
                  Stack utiliza cookies para mejorar tu experiencia. Las cookies son pequeños archivos de texto 
                  almacenados en tu dispositivo. Puedes desactivar las cookies en la configuración de tu navegador, 
                  pero esto puede afectar la funcionalidad del sitio.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Google AdSense</h2>
                <p className="leading-relaxed">
                  Este sitio utiliza Google AdSense para mostrar anuncios. Google puede usar cookies para 
                  personalizar los anuncios basándose en tus visitas anteriores a este y otros sitios web. 
                  Puedes optar por no participar en la publicidad personalizada visitando{' '}
                  <a 
                    href="https://www.google.com/settings/ads" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:text-primary-300 underline"
                  >
                    Configuración de anuncios de Google
                  </a>.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Google Analytics</h2>
                <p className="leading-relaxed">
                  Utilizamos Google Analytics para analizar el uso del sitio. Google Analytics recopila 
                  información de forma anónima sobre cómo los visitantes utilizan el sitio. Esta información 
                  nos ayuda a mejorar nuestro contenido y servicios.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Enlaces a Terceros</h2>
                <p className="leading-relaxed">
                  Nuestro sitio puede contener enlaces a sitios web de terceros. No somos responsables de 
                  las prácticas de privacidad o el contenido de estos sitios externos.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Seguridad</h2>
                <p className="leading-relaxed">
                  Tomamos medidas razonables para proteger la información recopilada contra pérdida, robo, 
                  uso indebido y acceso no autorizado.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Tus Derechos</h2>
                <p className="leading-relaxed">
                  Tienes derecho a:
                </p>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>Solicitar acceso a tu información personal</li>
                  <li>Solicitar la corrección de información inexacta</li>
                  <li>Solicitar la eliminación de tu información</li>
                  <li>Oponerte al procesamiento de tu información</li>
                </ul>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">9. Cambios a esta Política</h2>
                <p className="leading-relaxed">
                  Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. 
                  Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">10. Contacto</h2>
                <p className="leading-relaxed">
                  Si tienes preguntas sobre esta Política de Privacidad, puedes contactarnos a través de:
                </p>
                <p className="mt-4">
                  <strong className="text-white">Email:</strong>{' '}
                  <a href="mailto:contacto@stacklive.site" className="text-primary-400 hover:text-primary-300">
                    contacto@stacklive.site
                  </a>
                </p>
              </section>

            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}