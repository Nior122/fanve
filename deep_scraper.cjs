const fs = require('fs');
const https = require('https');

async function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrapeProfile(targetUrl) {
  console.log(`Starting deep scrape for: ${targetUrl}`);
  const allMedia = [];
  const seen = new Set();
  let currentPage = 0;
  const maxItems = 300;

  while (allMedia.length < maxItems) {
    const url = currentPage === 0 ? targetUrl : `${targetUrl}?o=${currentPage * 50}`;
    console.log(`Fetching page ${currentPage + 1}: ${url}`);
    
    try {
      const html = await fetch(url);
      // More aggressive regex to find media URLs in various attributes
      const mediaRegex = /(?:https:)?\/\/img\.coomer\.st\/data\/.*?\.(?:jpe?g|png|gif|webp|avif|mp4)|(?:\/data\/.*?\.(?:jpe?g|png|gif|webp|avif|mp4))/gi;
      let match;
      let foundOnPage = 0;

      while ((match = mediaRegex.exec(html)) !== null) {
        let orig = match[0];
        if (orig.startsWith('//')) orig = 'https:' + orig;
        if (orig.startsWith('/')) orig = 'https://img.coomer.st' + orig;
        
        if (!seen.has(orig)) {
          seen.add(orig);
          const isVideo = orig.toLowerCase().endsWith('.mp4');
          const thumbnail = isVideo ? null : orig.replace('/data/', '/thumbnail/data/');
          allMedia.push({
            url: thumbnail || orig,
            original_url: orig,
            type: isVideo ? 'video' : 'image',
            thumbnail: thumbnail,
            caption: isVideo ? 'Midnight vibes 😈💋 ▶️' : 'Sultry queen ✨🔥',
            metadata: { filename: orig.split('/').pop() }
          });
          foundOnPage++;
          if (allMedia.length >= maxItems) break;
        }
      }

      console.log(`Found ${foundOnPage} new items on page ${currentPage + 1}. Total: ${allMedia.length}`);
      
      if (foundOnPage === 0 || !html.includes('?o=')) {
        console.log("No more items or pagination found.");
        break;
      }
      
      currentPage++;
    } catch (error) {
      console.error(`Error on page ${currentPage + 1}:`, error.message);
      break;
    }
  }

  console.log(`Scraping complete. Total items collected: ${allMedia.length}`);
  fs.writeFileSync('scraped_data_300.json', JSON.stringify(allMedia, null, 2));
}

const targetUrl = 'https://coomer.st/onlyfans/user/bunni.emmie';
scrapeProfile(targetUrl);
