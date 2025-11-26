import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { translateWithCache } from '../lib/translate';

export default function TranslatedText({ children, as: Component = 'span' }) {
  const { locale } = useRouter();
  const [translated, setTranslated] = useState(children);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    async function translate() {
      if (!children || locale === 'es') {
        setTranslated(children);
        return;
      }

      setIsTranslating(true);
      try {
        const result = await translateWithCache(children, locale);
        setTranslated(result);
      } catch (error) {
        console.error('Translation failed:', error);
        setTranslated(children);
      } finally {
        setIsTranslating(false);
      }
    }

    translate();
  }, [children, locale]);

  return <Component>{translated}</Component>;
}
