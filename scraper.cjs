const fs = require('fs');
const path = require('path');
const https = require('https');

async function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ text: () => Promise.resolve(data) }));
    }).on('error', reject);
  });
}

async function scrapeProfile(url) {
  console.log(`Starting simple scrape for: ${url}`);
  try {
    const response = await fetch(url);
    const html = await response.text();

    const display_name = html.match(/<meta property="og:title" content="(.*?)"/)?.[1] || 'Unknown';
    const username = display_name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_ts' + new Date().toISOString().replace(/[-:T.Z]/g, '');
    const bio = html.match(/<meta name="description" content="(.*?)"/)?.[1] || '';
    const profile_picture_url = html.match(/<meta property="og:image" content="(.*?)"/)?.[1] || '';
    const cover_photo_url = profile_picture_url;

    const metadata = { display_name, username, bio, profile_picture_url, cover_photo_url };
    console.log('Metadata extracted:', metadata);

    const media = [];
    const imageRegex = /https:\/\/img\.coomer\.st\/data\/.*?\.(jpe?g|png|gif|webp|avif)/gi;
    const videoRegex = /https:\/\/.*?\.coomer\.st\/.*?\.mp4/gi;

    let match;
    const seen = new Set();

    while ((match = imageRegex.exec(html)) !== null) {
      const orig = match[0];
      if (!seen.has(orig)) {
        seen.add(orig);
        const thumbnail = orig.replace('/data/', '/thumbnail/data/');
        media.push({
          url: thumbnail,
          original_url: orig,
          type: 'image',
          thumbnail: thumbnail,
          caption: 'Sultry queen ✨🔥',
          metadata: { filename: orig.split('/').pop() }
        });
      }
    }

    while ((match = videoRegex.exec(html)) !== null) {
      const orig = match[0];
      if (!seen.has(orig)) {
        seen.add(orig);
        media.push({
          url: orig,
          original_url: orig,
          type: 'video',
          thumbnail: null,
          caption: 'Midnight vibes 😈💋 ▶️',
          metadata: { filename: orig.split('/').pop() }
        });
      }
    }

    console.log(`Collected ${media.length} media items.`);
    const output = { profile: metadata, media: media };
    fs.writeFileSync('scraped_data.json', JSON.stringify(output, null, 2));
    console.log('Results saved to scraped_data.json');

  } catch (error) {
    console.error('Error during scraping:', error);
  }
}

const targetUrl = process.argv[2] || 'https://coomer.st/onlyfans/user/bunni.emmie';
scrapeProfile(targetUrl);
