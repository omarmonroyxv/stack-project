import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <Layout
      title="Términos y Condiciones"
      description="Términos y condiciones de uso de Stack"
    >
      <div className="min-h-screen bg-slate-950 py-12">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              Términos y Condiciones
            </h1>
            
            <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
              
              <p className="text-xl text-gray-400 mb-8">
                Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. Aceptación de los Términos</h2>
                <p className="leading-relaxed">
                  Al acceder y utilizar Stack (stacklive.site), aceptas cumplir con estos Términos y Condiciones. 
                  Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestro sitio.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. Descripción del Servicio</h2>
                <p className="leading-relaxed">
                  Stack es una plataforma que proporciona:
                </p>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>Noticias y análisis deportivos sobre fútbol</li>
                  <li>Información sobre resultados, fixtures y clasificaciones</li>
                  <li>Predicciones y análisis de partidos</li>
                  <li>Noticias sobre fichajes y lesiones</li>
                </ul>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. Uso Aceptable</h2>
                <p className="leading-relaxed mb-4">
                  Al usar Stack, aceptas NO:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Usar el sitio para actividades ilegales</li>
                  <li>Intentar hackear o dañar el sitio</li>
                  <li>Copiar o distribuir contenido sin permiso</li>
                  <li>Usar bots o scraping automatizado</li>
                  <li>Publicar contenido ofensivo o spam</li>
                </ul>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. Propiedad Intelectual</h2>
                <p className="leading-relaxed">
                  Todo el contenido de Stack, incluyendo textos, imágenes, logos y diseño, está protegido 
                  por derechos de autor. No puedes reproducir, distribuir o modificar el contenido sin 
                  autorización expresa.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. Exactitud de la Información</h2>
                <p className="leading-relaxed">
                  Aunque nos esforzamos por proporcionar información precisa y actualizada, Stack no 
                  garantiza la exactitud, completitud o fiabilidad de la información proporcionada. 
                  Los resultados y estadísticas son informativos y pueden contener errores.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. Enlaces a Terceros</h2>
                <p className="leading-relaxed">
                  Stack puede contener enlaces a sitios web de terceros. No somos responsables del contenido 
                  o prácticas de privacidad de estos sitios externos.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. Publicidad</h2>
                <p className="leading-relaxed">
                  Stack muestra anuncios a través de Google AdSense y otros servicios de publicidad. 
                  No controlamos el contenido de los anuncios de terceros y no somos responsables por ellos.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">8. Limitación de Responsabilidad</h2>
                <p className="leading-relaxed">
                  Stack no será responsable de ningún daño directo, indirecto, incidental o consecuente 
                  que resulte del uso o la imposibilidad de usar el sitio.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">9. Modificaciones del Servicio</h2>
                <p className="leading-relaxed">
                  Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del 
                  sitio en cualquier momento sin previo aviso.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">10. Cambios a los Términos</h2>
                <p className="leading-relaxed">
                  Podemos actualizar estos Términos y Condiciones en cualquier momento. El uso continuado 
                  del sitio después de los cambios constituye tu aceptación de los nuevos términos.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">11. Ley Aplicable</h2>
                <p className="leading-relaxed">
                  Estos términos se rigen por las leyes de México. Cualquier disputa se resolverá en los 
                  tribunales competentes de Puebla, México.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">12. Contacto</h2>
                <p className="leading-relaxed">
                  Para preguntas sobre estos Términos y Condiciones:
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