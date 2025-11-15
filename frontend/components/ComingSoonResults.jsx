import { motion } from 'framer-motion';
import { FiCalendar, FiTrendingUp, FiUsers, FiZap, FiAward, FiTarget } from 'react-icons/fi';
import Link from 'next/link';

export default function ComingSoonResults() {
  const features = [
    {
      icon: FiZap,
      title: 'Resultados en Tiempo Real',
      description: 'Marcadores actualizados segundo a segundo',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: FiTrendingUp,
      title: 'Estadísticas Avanzadas',
      description: 'xG, posesión, mapas de calor y más',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiUsers,
      title: 'Alineaciones Confirmadas',
      description: 'Formaciones y cambios en vivo',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FiTarget,
      title: 'Eventos del Partido',
      description: 'Goles, tarjetas y sustituciones',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiAward,
      title: 'Clasificaciones en Vivo',
      description: 'Tablas actualizadas automáticamente',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: FiCalendar,
      title: 'Fixture Completo',
      description: 'Calendario de todas las ligas',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      <div className="relative container-custom py-20 px-4">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600/10 to-blue-600/10 border border-primary-600/20 rounded-full backdrop-blur-xl mb-8"
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">
              Próximamente
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl font-black mb-6"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Resultados
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              en Vivo
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-400 mb-4 max-w-2xl mx-auto"
          >
            Estamos construyendo la mejor plataforma de resultados en tiempo real
          </motion.p>

          {/* Launch Date */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
          >
            <FiCalendar className="text-primary-400 w-5 h-5" />
            <span className="text-gray-300">Lanzamiento:</span>
            <span className="font-bold text-primary-400">Q1 2026</span>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`} />
                
                {/* Card */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full transition-all duration-300 group-hover:border-white/20">
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm text-primary-400 inline-flex items-center gap-1">
                      Próximamente
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glow Background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-blue-600 to-cyan-600 rounded-3xl blur-2xl opacity-20" />
          
          {/* Card */}
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 text-center overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Mientras tanto, explora nuestro contenido
              </h2>
              
              <p className="text-xl text-gray-300 mb-8">
                📰 Noticias • 🔮 Predicciones • ✍️ Fichajes • ⚡ Curiosidades
              </p>

              <Link href="/blog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white font-bold text-lg rounded-xl shadow-2xl shadow-primary-500/50 transition-all duration-300"
                >
                  <span>Ir al Blog</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
              </Link>

              <p className="mt-6 text-sm text-gray-400">
                ¿Quieres ser de los primeros en saberlo? 
                <Link href="/blog" className="text-primary-400 hover:text-primary-300 ml-1 underline underline-offset-2">
                  Síguenos en el blog
                </Link>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: '10K+', label: 'Ligas Cubiertas' },
            { number: '50K+', label: 'Partidos por Mes' },
            { number: '24/7', label: 'Actualizaciones' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}