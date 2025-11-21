// pages/sitemap.xml.js
// Este archivo genera automáticamente el sitemap.xml para Google

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://stacklive.site';
  const apiUrl = 'https://stack-project.onrender.com/api/blog';

  try {
    // Fetch todos los posts del blog
    const response = await fetch(`${apiUrl}?limit=1000`);
    const data = await response.json();

    let postUrls = '';

    if (data.success && Array.isArray(data.data)) {
      postUrls = data.data.map(post => {
        const lastmod = post.updatedAt || post.createdAt;
        return `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      }).join('');
    }

    // Generar el XML del sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/live</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>${postUrls}
</urlset>`;

    // Configurar headers para XML
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.write(sitemap);
    res.end();

  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Sitemap mínimo en caso de error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.9</priority>
  </url>
</urlset>`;

    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.write(fallbackSitemap);
    res.end();
  }

  return { props: {} };
}

export default function Sitemap() {
  // Este componente nunca se renderiza
  return null;
}
