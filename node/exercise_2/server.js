const { readFileSync } = require('node:fs');
const { createServer } = require('node:http');
const URL = require('node:url');

const host = '127.0.0.1', port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf8');

  let response;
  const parsedUrl = URL.parse(req.url);
  const urlParts = parsedUrl.pathname.split('/').filter(e => e.length > 0).map(String);
  // console.log(parsedUrl);

  switch (`/${urlParts[0] ?? ''}`) {
    case '/':
    case '/overview': {
      const json = JSON.parse(readFileSync('./dev-data/data.json', 'utf8'));
      let overview = readFileSync('./templates/overview.html', 'utf8');

      const cards = [];
      for (const item of json) {
        item['organic'] = item['organic'] === true ? 'organic!' : '';
        let card = readFileSync('./templates/card-template.html', 'utf8');
        Object.keys(item).forEach(key => card = card.replaceAll(`{{${key}}}`, item[key]));
        cards.push(card);
      }
      overview = overview.replaceAll('{{cards}}', cards.join('<br>'));
      response = overview;
      break;
    }
    case '/product': {
      if (!urlParts[1]) {
        res.statusCode = 404;
        response = '<h1>PRODUCT NOT FOUND</h1>';
        break;
      }
      const item = JSON.parse(readFileSync('./dev-data/data.json', 'utf8')).find(e => `${e.id}` === urlParts[1]);
      item['organic'] = item['organic'] ? 'organic' : 'inorganic';
      if (!item) {
        res.statusCode = 404;
        response = '<h1>PRODUCT NOT FOUND</h1>';
        break;
      }

      let product = readFileSync('./templates/product.html', 'utf8');
      Object.keys(item).forEach(key => product = product.replaceAll(`{{${key}}}`, item[key]));
      response = product;
      break;
    }
    case '/search': {
      // const queries = {};
      // parsedUrl.query.split('&').map(e => {
      //   const [k, v] = e.split('=');
      //   queries[`${k}`] ??= v;
      // });
      const queries = new URLSearchParams(parsedUrl.query);
      let search = readFileSync('./templates/search.html', 'utf8');

      if (queries.size > 0) {
        console.log(queries);
        const item = JSON.parse(readFileSync('./dev-data/data.json', 'utf8')).find(e => e.productName === queries.get('p').trim());
        if (!item) {
          search = search.replaceAll('{{message}}', 'NOT FOUND');
          response = search;
          break;
        }

        // item['organic'] = item['organic'] ? 'organic' : 'inorganic';
        // let product = readFileSync('./templates/product.html', 'utf8');
        // Object.keys(item).forEach(key => product = product.replaceAll(`{{${key}}}`, item[key]));

        res.writeHead(302, { 'Location': `/product/${item.id}` });
        break;
      }

      search = search.replaceAll('{{message}}', 'Find your fruits');
      response = search;
      break;
    }
    case '/api': {
      res.setHeader('Content-Type', 'application/json; charset=utf8');
      const dataStr = readFileSync('./dev-data/data.json', 'utf8');

      if (urlParts[1]) {
        const item = JSON.parse(dataStr).find(e => `${e.id}` === urlParts[1]);
        response = JSON.stringify(item ? item : {
          'message': 'Not Found',
          'statusCode': 404,
        });
        break;
      }

      response = dataStr;
      break;
    }
    default: {
      res.statusCode = 404;
      response = '<h1>PAGE NOT FOUND</h1>';
      break;
    }
  }

  res.end(response);
});

server.listen(port, host, () => {
  console.log(`Server started: http://${host}:${port}`);
});
