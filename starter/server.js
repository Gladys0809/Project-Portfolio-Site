const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/src/index.html' : req.url;
  
  // Handle CSS file requests
  if (filePath === '/dist/main.css') {
    filePath = '/dist/main.css';
  }
  
  // Handle image requests
  if (filePath.startsWith('/img/')) {
    filePath = '/src' + filePath;
  }
  
  const fullPath = path.join(__dirname, filePath);
  
  // Get file extension for content type
  const ext = path.extname(fullPath).toLowerCase();
  const contentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  };

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }
    
    res.writeHead(200, {
      'Content-Type': contentType[ext] || 'text/plain'
    });
    res.end(data);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Portfolio server running at http://localhost:${PORT}`);
  console.log('📁 Serving files from:', __dirname);
  console.log('🎨 Your modern portfolio is ready to view!');
});