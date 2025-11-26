import { useRouter } from 'next/router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGlobe, FiCheck } from 'react-icons/fi';

const languages = {
  es: { name: 'Español', flag: '🇪🇸' },
  en: { name: 'English', flag: '🇬🇧' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  it: { name: 'Italiano', flag: '🇮🇹' },
  pt: { name: 'Português', flag: '🇵🇹' }
};

export default function LanguageSelector() {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (newLocale) => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-auto">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300"
      >
        <div className="flex items-center gap-2">
          <FiGlobe className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-semibold text-white">
            {languages[locale]?.flag} {languages[locale]?.name}
          </span>
        </div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 md:right-0 md:left-auto top-full mt-2 w-full md:w-56 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
            >
              {Object.entries(languages).map(([code, lang]) => (
                <button
                  key={code}
                  onClick={() => changeLanguage(code)}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors ${
                    locale === code ? 'bg-white/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-sm font-medium text-white">
                      {lang.name}
                    </span>
                  </div>
                  {locale === code && (
                    <FiCheck className="w-5 h-5 text-primary-500" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
