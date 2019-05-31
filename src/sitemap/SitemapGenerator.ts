import fs from 'fs';
import path from 'path';
import chunk from 'lodash/chunk';
import { buildSitemapIndex, createSitemap } from 'sitemap';

class SitemapGenerator {
  urls: [Object?];
  chunks: Object[][];
  sitemapSize: number;
  sitemapName: string;
  hostname: string;
  cacheTime: number;
  destinationDir: string;
  sitemaps: [string?];

  constructor(options) {
    this.sitemaps = [];
    this.urls = [];
    this.hostname = options.hostname;
    this.destinationDir = options.destinationDir || '.';
    this.sitemapName = options.sitemapName || 'sitemap'
    this.sitemapSize = options.sitemapSize || 50000;
    this.cacheTime = options.cacheTime || 600000;
  }

  add(url: Object) {
    this.urls.push(url)
  }

  generateSitemap(urls: [Object?], filename: string) {
    this.sitemaps.push(filename)
    this.saveToFile(createSitemap({
      hostname: this.hostname,
      cacheTime: this.cacheTime,
      urls
    }).toString(), filename)
  }

  generateSitemapIndex(filename: string) {
    const urls = this.sitemaps.map(filename => `${this.hostname}/${filename}`)
    this.saveToFile(buildSitemapIndex({ urls }).toString(), filename)
  }

  saveToFile(data: string, filename: string) {
    fs.writeFileSync(path.join(this.destinationDir, filename), data);
  }

  generate(filename: string = 'sitemap.xml') {
    this.chunks = chunk(this.urls, this.sitemapSize)

    if (this.chunks.length > 1) {
      this.chunks.forEach((chunk: [Object], index) => {
        this.generateSitemap(chunk, `${this.sitemapName}-${index}.xml`);
      })
      this.generateSitemapIndex(filename)
    } else {
      this.generateSitemap(this.urls, filename)
    }
  }
}

export default SitemapGenerator;
