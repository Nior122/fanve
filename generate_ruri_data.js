const fs = require('fs');
const path = require('path');

// Use forward slashes to avoid escaping issues
const srcDir = 'c:/Users/PC/Desktop/Favenue/data/ruri';

try {
    // Check if directory exists
    if (!fs.existsSync(srcDir)) {
        console.error(`Directory not found: ${srcDir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(srcDir)
        .filter(f => f.match(/^post-\d+\.json$/))
        .sort();

    if (files.length === 0) {
        console.error('No files found matching pattern post-*.json');
        process.exit(1);
    }

    const images = files.map((file, index) => {
        // Read file content
        const content = fs.readFileSync(path.join(srcDir, file), 'utf8');
        const data = JSON.parse(content);

        // Extract number more robustly
        const match = file.match(/(\d+)/);
        const numStr = match ? match[1] : '000';

        return {
            id: `ruri-${numStr}`,
            url: `/media/ruri/ruri-${numStr}.jpg`,
            thumbnailUrl: `/media/ruri/ruri-${numStr}.jpg`,
            caption: data.title || data.description,
            // description: data.description,
            width: 800,
            height: 1000,
            isLocked: index % 3 !== 0,
            isVisible: true,
            mediaType: 'image',
            sourceUrl: data.imageUrl,
            createdAt: data.timestamp,
            sha256: `sha256-ruri-${numStr}`
        };
    });

    console.log(JSON.stringify(images, null, 2));

} catch (err) {
    console.error('Error executing script:', err);
}
