const fs = require('fs');
const path = require('path');
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
      res.on('end', () => resolve({ text: () => Promise.resolve(data) }));
    }).on('error', reject);
  });
}

async function scrapeProfile(url) {
  console.log(`Starting simple scrape for: ${url}`);
  try {
    const response = await fetch(url);
    const html = await response.text();

    const display_name = html.match(/<h1 class="post__user-name">\s*<a.*?>\s*(.*?)\s*<\/a>/s)?.[1]?.trim() || 'bunni.emmie';
    const username = display_name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_ts' + new Date().toISOString().replace(/[-:T.Z]/g, '');
    const bio = html.match(/<div class="user-header__info-bio">(.*?)<\/div>/s)?.[1]?.trim() || '';
    const profile_picture_url = html.match(/<img class="user-header__profile-image" src="(.*?)"/)?.[1] || '';
    const cover_photo_url = html.match(/<img class="user-header__banner-image" src="(.*?)"/)?.[1] || profile_picture_url;

    const metadata = { display_name, username, bio, profile_picture_url, cover_photo_url };
    console.log('Metadata extracted:', metadata);

    const media = [];
    // Searching for any URL that looks like media on this site
    const genericMediaRegex = /https:\/\/img\.coomer\.st\/data\/.*?\.(jpe?g|png|gif|webp|avif|mp4)/gi;
    
    let match;
    const seen = new Set();

    while ((match = genericMediaRegex.exec(html)) !== null) {
      const orig = match[0];
      if (!seen.has(orig)) {
        seen.add(orig);
        const isVideo = orig.toLowerCase().endsWith('.mp4');
        const thumbnail = isVideo ? null : orig.replace('/data/', '/thumbnail/data/');
        media.push({
          url: thumbnail || orig,
          original_url: orig,
          type: isVideo ? 'video' : 'image',
          thumbnail: thumbnail,
          caption: isVideo ? 'Midnight vibes 😈💋 ▶️' : 'Sultry queen ✨🔥',
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
