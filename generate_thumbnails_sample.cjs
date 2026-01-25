const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Sample of first 10 video URLs for testing
const SAMPLE_URLS = [
    "https://video.twimg.com/amplify_video/1958987542554165248/vid/avc1/720x1280/KqthbZ48-Nbo1xpF.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1951802363293188097/vid/avc1/720x1280/RGwGqx4d6u9CWD62.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1951787642628239360/vid/avc1/720x1280/SpHLXFV8RMQ_SbzT.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962318108875747328/vid/avc1/720x1280/vF0yI7-RD6QMqQ7c.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962332159248846848/vid/avc1/720x1280/Rlojmv6ia4TRsay0.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962318230615400448/vid/avc1/720x1280/DF7UqAGvT-lTLisB.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962343953287835648/vid/avc1/720x1280/RkgvbCMWYMP7exZ8.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962344612598804480/vid/avc1/720x1280/2q8wxKrNIgAg2x9e.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962339276852740096/vid/avc1/720x1280/ZOgSAYJKOQlyMNHT.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962344065070170112/vid/avc1/720x1280/qe4krIC7ssKeoNPU.mp4?tag=21",
];

const THUMBNAILS_DIR = path.join(__dirname, 'public', 'thumbnails');
const TEMP_DIR = path.join(__dirname, 'temp_videos');

// Create directories
if (!fs.existsSync(THUMBNAILS_DIR)) {
    fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
}
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}

function downloadVideo(url, outputPath) {
    return new Promise((resolve, reject) => {
        console.log(`    Downloading to ${path.basename(outputPath)}...`);
        const file = fs.createWriteStream(outputPath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode}`));
                return;
            }
            const totalBytes = parseInt(response.headers['content-length'] || '0');
            let downloadedBytes = 0;

            response.on('data', (chunk) => {
                downloadedBytes += chunk.length;
                const percent = totalBytes ? ((downloadedBytes / totalBytes) * 100).toFixed(1) : '?';
                process.stdout.write(`\r    Progress: ${percent}%`);
            });

            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(''); // New line after progress
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(outputPath, () => { });
            reject(err);
        });
    });
}

function extractThumbnail(videoPath, thumbnailPath) {
    try {
        console.log(`    Extracting thumbnail...`);
        // Extract frame at 1 second, resize to 400px width for web
        execSync(
            `ffmpeg -i "${videoPath}" -ss 00:00:01 -vframes 1 -vf scale=400:-1 -q:v 2 "${thumbnailPath}"`,
            { stdio: 'pipe' }
        );
        return true;
    } catch (error) {
        console.error(`    Failed: ${error.message}`);
        return false;
    }
}

async function processVideos() {
    console.log(`\n🎬 Processing ${SAMPLE_URLS.length} sample videos...\n`);
    console.log(`This is a TEST run with 10 videos.`);
    console.log(`If successful, you can process all 143 videos.\n`);

    const thumbnailMap = {};
    let successCount = 0;

    for (let i = 0; i < SAMPLE_URLS.length; i++) {
        const url = SAMPLE_URLS[i];
        const videoId = `ebonies-${String(i + 1).padStart(3, '0')}`;
        const videoPath = path.join(TEMP_DIR, `${videoId}.mp4`);
        const thumbnailPath = path.join(THUMBNAILS_DIR, `${videoId}.jpg`);

        console.log(`\n[${i + 1}/${SAMPLE_URLS.length}] ${videoId}`);

        try {
            await downloadVideo(url, videoPath);
            const success = extractThumbnail(videoPath, thumbnailPath);

            if (success) {
                thumbnailMap[videoId] = `/thumbnails/${videoId}.jpg`;
                successCount++;
                console.log(`    ✅ Success!`);
            }

            // Delete video to save space
            fs.unlinkSync(videoPath);

        } catch (error) {
            console.error(`    ❌ Error: ${error.message}`);
        }
    }

    // Save results
    fs.writeFileSync(
        path.join(__dirname, 'thumbnail_map_sample.json'),
        JSON.stringify(thumbnailMap, null, 2)
    );

    console.log(`\n✅ Completed!`);
    console.log(`   Generated: ${successCount}/${SAMPLE_URLS.length} thumbnails`);
    console.log(`   Location: ${THUMBNAILS_DIR}`);
    console.log(`   Map file: thumbnail_map_sample.json\n`);

    // Cleanup
    try {
        fs.rmdirSync(TEMP_DIR, { recursive: true });
    } catch (e) { }

    console.log(`📝 Next steps:`);
    console.log(`   1. Check the thumbnails in public/thumbnails/`);
    console.log(`   2. If they look good, I can process all 143 videos`);
    console.log(`   3. Estimated time for all: ~45-60 minutes\n`);
}

// Check ffmpeg
try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    console.log('✅ ffmpeg is installed\n');
    processVideos().catch(console.error);
} catch (error) {
    console.error('❌ ERROR: ffmpeg is not installed!');
    console.error('Install: choco install ffmpeg');
    console.error('Or: https://ffmpeg.org/download.html');
    process.exit(1);
}
