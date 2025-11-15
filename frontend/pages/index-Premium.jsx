import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../components/Layout';
import { 
  FiZap, 
  FiTrendingUp, 
  FiAward, 
  FiTarget,
  FiCalendar,
  FiArrowRight,
  FiCheckCircle
} from 'react-icons/fi';

export default function Home() {
  const features = [
    {
      icon: FiZap,
      title: 'En Tiempo Real',
      description: 'Sigue todos los partidos con actualizaciones cada segundo',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      icon: FiTrendingUp,
      title: 'Estadísticas Avanzadas',
      description: 'xG, posesión, mapas de calor y análisis profundo',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiTarget,
      title: 'Predicciones',
      description: 'Pronósticos expertos basados en datos',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: FiAward,
      title: 'Noticias Exclusivas',
      description: 'Fichajes, lesiones y últimas novedades',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Ligas' },
    { number: '50K+', label: 'Partidos/Mes' },
    { number: '24/7', label: 'Actualizaciones' },
    { number: '100%', label: 'Gratis' }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[150px] animate-pulse delay-1000" />
        </div>

        <div className="relative container-custom py-24 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/10 border border-primary-600/20 rounded-full backdrop-blur-xl mb-8"
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
              </div>
              <span className="text-sm font-semibold text-primary-400">
                Próximamente - Q1 2026
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Resultados de Fútbol
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                en Tiempo Real
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Sigue todos los partidos en vivo, fixtures, clasificaciones 
              y las últimas noticias del mundo del fútbol.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/live">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white font-bold text-lg rounded-xl shadow-2xl shadow-primary-500/50 transition-all duration-300 flex items-center gap-3"
                >
                  <FiZap className="w-5 h-5" />
                  <span>Ver Partidos en Vivo</span>
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link href="/blog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 text-white font-bold text-lg rounded-xl transition-all duration-300 flex items-center gap-3"
                >
                  <span>Explorar Blog</span>
                  <FiArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500 w-5 h-5" />
                <span>100% Gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500 w-5 h-5" />
                <span>Sin Registro</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500 w-5 h-5" />
                <span>Actualizaciones Automáticas</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 border-y border-white/5">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container-custom">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white mb-4"
            >
              Todo lo que necesitas en un solo lugar
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              La plataforma más completa para seguir el fútbol mundial
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative"
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500`} />
                  
                  {/* Card */}
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto"
          >
            {/* Glow Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-blue-600 to-cyan-600 rounded-3xl blur-2xl opacity-20" />
            
            {/* Card */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Empieza a explorar ahora
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Mientras preparamos los resultados en vivo, disfruta de nuestro 
                contenido exclusivo sobre fútbol
              </p>

              <Link href="/blog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white font-bold text-lg rounded-xl shadow-2xl shadow-primary-500/50 transition-all duration-300"
                >
                  <span>Ver Blog</span>
                  <FiArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
}