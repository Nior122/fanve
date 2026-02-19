const https = require('https');
const fs = require('fs');

async function fetch(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            rejectUnauthorized: false,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'application/json'
            }
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', (err) => {
            console.error('HTTPS Get Error:', err);
            reject(err);
        });
    });
}

(async () => {
    // Try to guess the API endpoint
    const urls = [
        'https://coomer.st/api/v1/onlyfans/user/bunni.emmie',
        'https://coomer.st/api/v1/onlyfans/user/bunni.emmie/profile',
        'https://coomer.st/onlyfans/user/bunni.emmie' // Fallback to see if it returns JSON with Accept header
    ];

    for (const url of urls) {
        console.log(`Fetching ${url}...`);
        try {
            const data = await fetch(url);
            console.log(`Response length: ${data.length}`);
            if (data.startsWith('{') || data.startsWith('[')) {
                console.log('JSON detected!');
                fs.writeFileSync('api_response.json', data);
                console.log(`Saved to api_response.json from ${url}`);
                break;
            } else {
                console.log('Not JSON.');
            }
        } catch (err) {
            console.error(`Error fetching ${url}:`, err.message);
        }
    }
})();
