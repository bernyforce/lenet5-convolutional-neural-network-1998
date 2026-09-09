const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.tsv': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.ipynb': 'application/json; charset=utf-8'
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // API endpoint for slides
  if (pathname === '/api/slides') {
    res.writeHead(200, {
      ...SECURITY_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    const data = fs.readFileSync(path.join(ROOT_DIR, 'slides.json'), 'utf-8');
    return res.end(data);
  }

  // Route root to index.html
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  // Safe path resolving to prevent directory traversal
  const safePath = path.normalize(path.join(ROOT_DIR, pathname));
  if (!safePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('403 Forbidden');
  }

  // Defensive filtering: block hidden files/directories, coordination dossiers, backups, ledger, and keys
  const basename = path.basename(safePath);
  const relPath = path.relative(ROOT_DIR, safePath);
  const pathParts = relPath.split(path.sep);
  const hasHidden = pathParts.some(part => part.startsWith('.'));

  if (
    hasHidden ||
    basename.startsWith('.') ||
    relPath.startsWith('00-DIRECTION') ||
    relPath.includes('00-DIRECTION') ||
    relPath.includes('.bak') ||
    relPath.endsWith('.jsonl') ||
    relPath.endsWith('.key')
  ) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('403 Forbidden: Access to private system files is denied.');
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end('<h1>404 Not Found</h1><p>' + pathname + ' does not exist.</p>');
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Support HTTP Range requests (crucial for MP4 seeking on iOS/Mac Safari & Chrome)
    if (ext === '.mp4') {
      const range = req.headers.range;
      const fileSize = stats.size;

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        let start = parseInt(parts[0], 10);
        let end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (isNaN(start)) start = 0;
        if (isNaN(end) || end >= fileSize) end = fileSize - 1;

        // Validation against invalid or inverted ranges (prevent DoS)
        if (start < 0 || start > end || start >= fileSize) {
          res.writeHead(416, {
            ...SECURITY_HEADERS,
            'Content-Range': `bytes */${fileSize}`,
            'Access-Control-Allow-Origin': '*'
          });
          return res.end();
        }

        const chunksize = (end - start) + 1;
        const fileStream = fs.createReadStream(safePath, { start, end });

        fileStream.on('error', () => {
          if (!res.headersSent) {
            res.writeHead(500, SECURITY_HEADERS);
          }
          res.end();
        });

        res.writeHead(206, {
          ...SECURITY_HEADERS,
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*'
        });
        return fileStream.pipe(res);
      } else {
        const headers = {
          ...SECURITY_HEADERS,
          'Content-Length': fileSize,
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes',
          'Access-Control-Allow-Origin': '*'
        };
        if (['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.mp4'].includes(ext)) {
          headers['Cache-Control'] = 'public, max-age=31536000, immutable';
        }
        res.writeHead(200, headers);
        const fileStream = fs.createReadStream(safePath);
        fileStream.on('error', () => res.end());
        return fileStream.pipe(res);
      }
    }

    const headers = {
      ...SECURITY_HEADERS,
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Access-Control-Allow-Origin': '*'
    };

    if (['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg'].includes(ext)) {
      headers['Cache-Control'] = 'public, max-age=31536000, immutable';
    } else {
      headers['Cache-Control'] = 'no-cache';
    }

    // Force download for PPTX if needed
    if (ext === '.pptx') {
      headers['Content-Disposition'] = `attachment; filename="${path.basename(safePath)}"`;
    }

    res.writeHead(200, headers);
    fs.createReadStream(safePath).pipe(res);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`LeNet-5 Web Server running at http://${HOST}:${PORT}/`);
  console.log(`Public Cloudflare domain: https://lenet5.iatuto.com/`);
});
