// Simple translation service using MyMemory API (free, no API key needed)
export async function translateText(text, targetLang) {
  if (!text || targetLang === 'es') return text;

  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|${targetLang}`
    );
    const data = await response.json();

    if (data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
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
