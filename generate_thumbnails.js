const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Video URLs from mockData
const EBONIES_RAW_URLS = [
    "https://video.twimg.com/amplify_video/1958987542554165248/vid/avc1/720x1280/KqthbZ48-Nbo1xpF.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1951802363293188097/vid/avc1/720x1280/RGwGqx4d6u9CWD62.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1951787642628239360/vid/avc1/720x1280/SpHLXFV8RMQ_SbzT.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962318108875747328/vid/avc1/720x1280/vF0yI7-RD6QMqQ7c.mp4?tag=21",
    "https://video.twimg.com/amplify_video/1962332159248846848/vid/avc1/720x1280/Rlojmv6ia4TRsay0.mp4?tag=21",
    // Add more URLs here - I'll create the full list
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
        const file = fs.createWriteStream(outputPath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
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
        // Use ffmpeg to extract first frame
        execSync(`ffmpeg -i "${videoPath}" -ss 00:00:01 -vframes 1 -q:v 2 "${thumbnailPath}"`, {
            stdio: 'ignore'
        });
        return true;
    } catch (error) {
        console.error(`Failed to extract thumbnail: ${error.message}`);
        return false;
    }
}

async function processVideos() {
    console.log(`Processing ${EBONIES_RAW_URLS.length} videos...`);

    const thumbnailMap = {};

    for (let i = 0; i < EBONIES_RAW_URLS.length; i++) {
        const url = EBONIES_RAW_URLS[i];
        const videoId = `ebonies-${String(i + 1).padStart(3, '0')}`;
        const videoPath = path.join(TEMP_DIR, `${videoId}.mp4`);
        const thumbnailPath = path.join(THUMBNAILS_DIR, `${videoId}.jpg`);

        console.log(`[${i + 1}/${EBONIES_RAW_URLS.length}] Processing ${videoId}...`);

        try {
            // Download video
            console.log(`  Downloading...`);
            await downloadVideo(url, videoPath);

            // Extract thumbnail
            console.log(`  Extracting thumbnail...`);
            const success = extractThumbnail(videoPath, thumbnailPath);

            if (success) {
                thumbnailMap[videoId] = `/thumbnails/${videoId}.jpg`;
                console.log(`  ✓ Success`);
            } else {
                console.log(`  ✗ Failed to extract thumbnail`);
            }

            // Delete video file to save space
            fs.unlinkSync(videoPath);

        } catch (error) {
            console.error(`  ✗ Error: ${error.message}`);
        }
    }

    // Save thumbnail map
    fs.writeFileSync(
        path.join(__dirname, 'thumbnail_map.json'),
        JSON.stringify(thumbnailMap, null, 2)
    );

    console.log(`\nCompleted! Generated ${Object.keys(thumbnailMap).length} thumbnails.`);
    console.log(`Thumbnails saved to: ${THUMBNAILS_DIR}`);
    console.log(`Thumbnail map saved to: thumbnail_map.json`);

    // Cleanup temp directory
    fs.rmdirSync(TEMP_DIR, { recursive: true });
}

// Check if ffmpeg is installed
try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    processVideos();
} catch (error) {
    console.error('ERROR: ffmpeg is not installed!');
    console.error('Please install ffmpeg first:');
    console.error('  Windows: choco install ffmpeg');
    console.error('  Or download from: https://ffmpeg.org/download.html');
    process.exit(1);
}
