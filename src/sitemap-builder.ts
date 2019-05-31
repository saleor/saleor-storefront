import path from 'path';
import { SitemapGenerator, getCategories, getCollections, getProducts }  from './sitemap';

const distDir = path.join(__dirname, "../dist");

const generateSitemap = async (hostname: string) => {
  const sitemap = new SitemapGenerator({ hostname, destinationDir: distDir });
  
  sitemap.add({ url: '/' });
  sitemap.add({ url: '/page/about/' });

  await getCategories(({ url }) => {
    sitemap.add({ url });
  })
  await getCollections(({ url }) => {
    sitemap.add({ url });
  })
  await getProducts(({ url }) => {
    sitemap.add({ url });
  })

  sitemap.generate();
}

const args = process.argv.slice(2)
if (args.length !== 1) {
  console.log('Usage: npm run sitemap <hostname>');
  process.exit();
}
generateSitemap(args[0]);
