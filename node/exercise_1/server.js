const { createServer } = require('node:http');
const fs = require('node:fs');

const host = '127.0.0.1', port = 3000;

const server = createServer((req, res) => {
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain; charset=utf8');
  // res.end(fs.readFileSync(
  //   './txt/final.txt',
  //   'utf8',
  // ));

  // res.setHeader('Content-Type', 'text/html; charset=utf8');
  res.setHeader('Content-Type', 'application/json; charset=utf8');

  let response;
  switch (req.url) {
    case '/':
      response = '<h1>This is homepage</h1>';
      break;
    case '/overview':
      response = '<h1>This is overview page</h1>';
      break;
    case '/product':
      response = '<h1>This is product page</h1>';
      break;
    case '/api':
      response = fs.readFileSync(
        './dev-data/data.json',
        'utf8',
      );
      break;
    default:
      response = '<h1>PAGE NOT FOUND</h1>';
      break;
  }
  res.end(response);
});

server.listen(port, host, () => {
  console.log(`Server started: http://${host}:${port}`);
});
