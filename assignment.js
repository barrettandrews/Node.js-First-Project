const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    // Serve the form for GET requests to the root URL
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <form method="POST" action="/greet">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required><br>
        <label for="color">Favorite Color:</label>
        <input type="text" id="color" name="color" required><br>
        <button type="submit">Submit</button>
      </form>
      <div id="time"></div>
      <script>
        setInterval(() => {
          const timeElement = document.getElementById('time');
          const currentTime = new Date().toLocaleTimeString();
          timeElement.textContent = 'Current time: ' + currentTime;
        }, 1000);
      </script>
    `);
  } else if (req.url === '/greet' && req.method === 'POST') {
    // Handle form submission for POST requests to /greet
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const name = formData.get('name');
      const color = formData.get('color');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <html>
          <head>
            <style>
              body {
                background-color: ${color};
              }
            </style>
          </head>
          <body>
            <h1>Hello, ${name}!</h1>
          </body>
        </html>
      `);
    });
  } else {
    // Respond with 404 for other routes
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});