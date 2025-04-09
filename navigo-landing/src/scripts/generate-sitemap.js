const fs = require('fs');
const globby = require('globby');
const prettier = require('prettier');

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'src/pages/**/*.tsx',
    'src/app/**/*.tsx',
    '!src/pages/_*.tsx',
    '!src/pages/api',
    '!src/app/api',
    '!src/app/layout.tsx',
  ]);

  const currentDate = new Date().toISOString();
  
  const baseUrl = 'https://trynavigo.com';
  
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            // Get the route from the file path
            const path = page
              .replace('src/pages', '')
              .replace('src/app', '')
              .replace('.tsx', '')
              .replace('/page', '');
            const route = path === '/index' ? '' : path;
            
            // Set higher priority for main pages
            let priority = 0.7;
            if (route === '') priority = 1.0;
            if (route === '/try-navigo') priority = 0.8;
            
            return `
              <url>
                <loc>${baseUrl}${route}</loc>
                <lastmod>${currentDate}</lastmod>
                <changefreq>${route === '' ? 'weekly' : 'monthly'}</changefreq>
                <priority>${priority}</priority>
              </url>
            `;
          })
          .join('')}
    </urlset>
  `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  fs.writeFileSync('public/sitemap.xml', formatted);
})();