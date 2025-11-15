import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiZap, 
  FiBookOpen, 
  FiMenu, 
  FiX,
  FiTwitter,
  FiFacebook,
  FiInstagram,
  FiYoutube
} from 'react-icons/fi';

export default function Layout({ children, title, description }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Inicio', href: '/', icon: FiHome },
    { name: 'En Vivo', href: '/live', icon: FiZap, badge: 'Pronto' },
    { name: 'Blog', href: '/blog', icon: FiBookOpen }
  ];
  
  const isActive = (path) => router.pathname === path;

  return (
    <>
      <Head>
        <title>{title ? `${title} | Stack` : 'Stack - Resultados de Fútbol en Vivo'}</title>
        <meta name="description" content={description || 'La mejor plataforma para seguir resultados de fútbol en vivo, noticias, análisis y predicciones.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content={title || 'Stack'} />
        <meta property="og:description" content={description || 'Resultados de fútbol en vivo'} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title || 'Stack'} />
        <meta name="twitter:description" content={description || 'Resultados de fútbol en vivo'} />
      </Head>

      <div className="min-h-screen flex flex-col bg-slate-950">
        
        {/* Premium Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled 
              ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
              : 'bg-transparent'
          }`}
        >
          <nav className="container-custom">
            <div className="flex items-center justify-between h-20">
              
              {/* Logo Premium */}
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                  
                  {/* Logo */}
                  <div className="relative w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/50 group-hover:shadow-primary-500/70 transition-all duration-300">
                    <span className="text-white font-black text-2xl">S</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-2xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Stack
                  </span>
                  <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    Live Scores
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="relative group"
                    >
                      <div className={`
                        flex items-center space-x-2 px-6 py-3 rounded-xl
                        transition-all duration-300 font-semibold
                        ${active
                          ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg shadow-primary-500/30'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }
                      `}>
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs bg-yellow-500 text-yellow-950 rounded-full font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      
                      {/* Active indicator */}
                      {active && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-primary-400 to-blue-400 rounded-full"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div className="hidden md:block">
                <Link href="/blog">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300"
                  >
                    Ver Blog
                  </motion.button>
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-3 rounded-xl hover:bg-white/5 text-white transition-colors"
              >
                {mobileMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="py-6 space-y-2 border-t border-white/5">
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);
                      
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`
                            flex items-center space-x-3 px-4 py-3 rounded-xl
                            transition-all duration-300 font-semibold
                            ${active
                              ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }
                          `}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.name}</span>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-xs bg-yellow-500 text-yellow-950 rounded-full font-bold ml-auto">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </motion.header>

        {/* Main Content */}
        <main className="flex-grow pt-20">
          {children}
        </main>

        {/* Premium Footer */}
        <footer className="relative bg-gradient-to-b from-slate-950 to-slate-900 border-t border-white/5 mt-20">
          {/* Decorative top border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50" />
          
          <div className="container-custom py-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              
              {/* Brand */}
              <div className="md:col-span-5">
                <Link href="/" className="flex items-center space-x-3 group mb-6">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur opacity-30" />
                    <div className="relative w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-black text-2xl">S</span>
                    </div>
                  </div>
                  <span className="text-2xl font-black text-white">Stack</span>
                </Link>
                
                <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
                  La plataforma definitiva para resultados de fútbol en vivo, 
                  noticias exclusivas, análisis profundos y predicciones expertas.
                </p>

                {/* Social */}
                <div className="flex space-x-3">
                  {[
                    { icon: FiTwitter, href: '#', label: 'Twitter' },
                    { icon: FiFacebook, href: '#', label: 'Facebook' },
                    { icon: FiInstagram, href: '#', label: 'Instagram' },
                    { icon: FiYoutube, href: '#', label: 'YouTube' }
                  ].map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="group relative"
                      >
                        <div className="absolute -inset-2 bg-gradient-to-r from-primary-600 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300" />
                        <div className="relative p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                          <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Quick Links */}
              <div className="md:col-span-3">
                <h3 className="text-white font-bold mb-6 text-lg">Navegación</h3>
                <ul className="space-y-3">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                      >
                        <span className="w-0 group-hover:w-6 h-px bg-gradient-to-r from-primary-400 to-blue-400 transition-all duration-300" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div className="md:col-span-4">
                <h3 className="text-white font-bold mb-6 text-lg">Contenido</h3>
                <ul className="space-y-3">
                  {['Noticias', 'Predicciones', 'Fichajes', 'Lesiones', 'Curiosidades'].map((category) => (
                    <li key={category}>
                      <Link 
                        href="/blog"
                        className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                      >
                        <span className="w-0 group-hover:w-6 h-px bg-gradient-to-r from-primary-400 to-blue-400 transition-all duration-300" />
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5 mt-12 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                <p>© 2024 Stack. Todos los derechos reservados.</p>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                  <a href="#" className="hover:text-white transition-colors">Términos</a>
                  <a href="#" className="hover:text-white transition-colors">Contacto</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}