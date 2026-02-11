const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeProfile(url) {
  console.log(`Starting scrape for: ${url}`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

    const metadata = await page.evaluate(() => {
      const display_name = document.querySelector('meta[property="og:title"]')?.content || document.title || 'Unknown';
      const username = display_name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_ts' + new Date().toISOString().replace(/[-:T.Z]/g, '');
      const bio = document.querySelector('meta[name="description"]')?.content || '';
      const profile_picture_url = document.querySelector('meta[property="og:image"]')?.content || '';
      const cover_photo_url = profile_picture_url; // Fallback

      return { display_name, username, bio, profile_picture_url, cover_photo_url };
    });

    console.log('Metadata extracted:', metadata);

    const media = await page.evaluate(() => {
      const base = location.href;
      const resolve = u => { try { return new URL(u, base).href; } catch { return u; } };
      const parseSrcset = s => {
        if (!s) return null;
        const parts = s.split(',').map(x => x.trim()).map(p => {
          const t = p.split(/\s+/); const url = t[0]; let w = 0;
          if (t[1] && t[1].endsWith('w')) w = parseInt(t[1]); else if (t[1] && t[1].endsWith('x')) w = parseFloat(t[1]) * 1000;
          return { url, w };
        }).filter(c=>c.url);
        if (!parts.length) return null;
        parts.sort((a,b)=>b.w-a.w);
        return parts[0].url;
      };
      const looksLikeMedia = u => !!u && /\.(jpe?g|png|gif|webp|mp4|webm|mov|ogg|ogv|avif|bmp|svg)(\?|$)/i.test(u);
      const seen = new Set(); const results = [];
      const templates = ["Sultry queen ✨🔥","Midnight vibes 😈💋","Velvet curves 💫😍","Playful tease 😏🍒","Luxury mood 💎😉","Irresistible glow ✨😉","Tempting silhouette 😍🔥","Secret desire 💋🌙"];
      const pickCaption = (meta, isVideo, idx) => {
        const hint = meta && (meta.alt || meta.filename || meta.surroundingText);
        if (hint) return (hint.toString().slice(0,36) + (isVideo ? ' ▶️' : '') );
        return templates[idx % templates.length] + (isVideo ? ' ▶️' : '');
      };
      const push = (type, raw, el) => {
        if (!raw) return;
        const orig = resolve(raw);
        if (!orig || seen.has(orig)) return; seen.add(orig);
        let final = orig, thumbnail = null;
        try {
          const u = new URL(orig);
          if (u.hostname === 'img.coomer.st') {
            if (u.pathname.includes('/data/') && !u.pathname.includes('/thumbnail/')) {
              thumbnail = `${u.origin}${u.pathname.replace('/data/','/thumbnail/data/')}${u.search||''}`;
            } else if (u.pathname.includes('/thumbnail/data/')) {
              thumbnail = orig;
            }
          }
        } catch(e){}
        if (type === 'image') final = thumbnail || orig;
        const filename = orig.split('/').pop().split('?')[0] || null;
        const surroundingText = el && el.innerText ? el.innerText : null;
        const idx = results.length;
        const caption = pickCaption({ alt: el && el.alt ? el.alt : null, filename, surroundingText }, type === 'video', idx);
        results.push({
          url: final,
          original_url: orig,
          type,
          thumbnail: type === 'image' ? (thumbnail || final) : null,
          caption,
          metadata: { filename, alt: el && el.alt ? el.alt : null, surroundingText }
        });
      };

      document.querySelectorAll('img').forEach(img => {
        const best = img.getAttribute('srcset') ? parseSrcset(img.getAttribute('srcset')) : null;
        const s = best || img.getAttribute('src') || img.src;
        if (s) push('image', s, img);
      });

      document.querySelectorAll('a[href]').forEach(a => {
        const h = a.getAttribute('href');
        if (h && looksLikeMedia(h)) {
          if (/\.(mp4|webm|mov|ogg|m3u8)/i.test(h)) push('video', h, a); else push('image', h, a);
        }
      });

      return results;
    });

    console.log(`Collected ${media.length} media items.`);
    
    const output = {
      profile: metadata,
      media: media
    };

    fs.writeFileSync('scraped_data.json', JSON.stringify(output, null, 2));
    console.log('Results saved to scraped_data.json');

  } catch (error) {
    console.error('Error during scraping:', error);
  } finally {
    await browser.close();
  }
}

const targetUrl = process.argv[2] || 'https://coomer.st/onlyfans/user/bunni.emmie';
scrapeProfile(targetUrl);
