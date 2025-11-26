// Translation service using Google Translate (free, no API key, no limits)
export async function translateText(text, targetLang) {
  if (!text || targetLang === 'es') return text;

  try {
    // Using Google Translate via translate.googleapis.com (free, no key needed for client-side)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

    console.log('Calling Google Translate:', { text: text.substring(0, 50), targetLang });

    const response = await fetch(url);
    const data = await response.json();

    // Google Translate returns: [[["translated","original",null,null,3]],null,"es"]
    if (data && data[0] && Array.isArray(data[0])) {
      const translated = data[0].map(item => item[0]).join('');

      console.log('Translation result:', {
        original: text.substring(0, 50),
        translated: translated.substring(0, 50)
      });

      return translated;
    }

    return text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

// Translate multiple texts in batch
export async function translateBatch(texts, targetLang) {
  if (targetLang === 'es') return texts;

  const promises = texts.map(text => translateText(text, targetLang));
  return Promise.all(promises);
}

// Cache translations to avoid repeated API calls
const translationCache = new Map();

export async function translateWithCache(text, targetLang) {
  const cacheKey = `${text}_${targetLang}`;

  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  const translated = await translateText(text, targetLang);
  translationCache.set(cacheKey, translated);

  return translated;
}
