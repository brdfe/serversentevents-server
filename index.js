const http = require('node:http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Helloo World!')
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.flushHeaders();

  const interval = setInterval(() => {
    res.write(`data: ${new Date().toISOString()}\n\n`);
  }, 1000);

  // 👇 Detect client disconnect
  req.on("close", () => {
    console.log("Client disconnected");
    clearInterval(interval);
    res.end();
  });

  res.on("close", () => {
    console.log('couldnt contact client')
  })
});

server.listen(80, 'localhost', () => {
  console.log('Server started on port 80');
})
