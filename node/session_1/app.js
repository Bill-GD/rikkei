const { createServer } = require('node:http');
const fs = require('node:fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;

  const requestedUrl = req.url;

  let response;
  switch (requestedUrl) {
    case '/':
      res.setHeader('Content-Type', 'text/html');
      response = fs.readFileSync(
        './templates/index.html',
        { encoding: 'utf8' },
      );
      break;
    case '/users':
      res.setHeader('Content-Type', 'application/json');
      response = fs.readFileSync(
        './data/users.json',
        { encoding: 'utf8' },
      );
      break;
    default:
      res.setHeader('Content-Type', 'text/html; charset=utf8');
      response = `
        <h1>Chị thấy buổi 8 luyện tập lớp có làm mini test</h1>
      `;
      break;
  }
  res.end(response);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
