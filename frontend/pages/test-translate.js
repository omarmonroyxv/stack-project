import { useState } from 'react';
import { useRouter } from 'next/router';
import { translateText } from '../lib/translate';

export default function TestTranslate() {
  const router = useRouter();
  const { locale } = router;
  const [input, setInput] = useState('Hola mundo');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const result = await translateText(input, locale);
      setOutput(result);
    } catch (error) {
      console.error('Error:', error);
      setOutput('ERROR: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1>Translation Test</h1>
      <p>Current locale: <strong>{locale}</strong></p>

      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: '10px', width: '300px', marginRight: '10px', color: '#000' }}
        />
        <button onClick={handleTranslate} disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </div>

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#222', borderRadius: '8px' }}>
        <h3>Result:</h3>
        <p>{output || 'Click translate to see result'}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <p>Change language using the language selector in the header, then click translate again.</p>
      </div>
    </div>
  );
}
