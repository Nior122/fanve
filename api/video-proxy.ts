import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
    runtime: 'nodejs',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { url } = req.query;

    // Validate URL parameter
    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid url parameter' });
    }

    // Only proxy Twitter videos for security
    if (!url.includes('video.twimg.com')) {
        return res.status(403).json({ error: 'Only Twitter videos are allowed' });
    }

    try {
        // Prepare headers for upstream request
        const upstreamHeaders: Record<string, string> = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        };

        // Forward Range header for video seeking support
        if (req.headers.range) {
            upstreamHeaders['Range'] = req.headers.range as string;
        }

        // Fetch video from Twitter (server-to-server, no Origin/Referer)
        const response = await fetch(url, {
            method: 'GET',
            headers: upstreamHeaders,
        });

        if (!response.ok) {
            return res.status(response.status).json({
                error: `Upstream fetch failed: ${response.status} ${response.statusText}`,
            });
        }

        // Set appropriate status code (206 for range requests, 200 otherwise)
        const status = response.status;
        res.status(status);

        // Forward important headers
        const contentType = response.headers.get('content-type');
        const contentLength = response.headers.get('content-length');
        const contentRange = response.headers.get('content-range');
        const acceptRanges = response.headers.get('accept-ranges');

        if (contentType) res.setHeader('Content-Type', contentType);
        if (contentLength) res.setHeader('Content-Length', contentLength);
        if (contentRange) res.setHeader('Content-Range', contentRange);
        if (acceptRanges) res.setHeader('Accept-Ranges', acceptRanges);

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Range');

        // Set cache headers for performance
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

        // Stream the response body
        const buffer = await response.arrayBuffer();
        res.send(Buffer.from(buffer));

    } catch (error) {
        console.error('Video proxy error:', error);
        return res.status(502).json({
            error: 'Failed to fetch video from upstream',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
