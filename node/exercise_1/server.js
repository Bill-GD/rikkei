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

  res.setHeader('Content-Type', 'text/html; charset=utf8');
  // res.setHeader('Content-Type', 'application/json; charset=utf8');
  const reqUrlParts = req.url.split('/').filter(value => value.length > 0).map(String);

  let response;
  switch (`/${reqUrlParts[0] ?? ''}`) {
    case '/':
    case '/overview': {
      const data = JSON.parse(fs.readFileSync(
        './dev-data/data.json',
        'utf8',
      ));

      let overviewContent = fs.readFileSync(
        './templates/overview.html',
        'utf8',
      );

      const cards = [];
      if (data instanceof Array && data.length > 0) {
        for (const item of data) {
          let cardTemplate = fs.readFileSync(
            './templates/card-template.html',
            'utf8',
          );

          Object.keys(item).forEach(key => {
            cardTemplate = cardTemplate.replaceAll(`{{${key}}}`, item[key]);
          });
          cards.push(cardTemplate);
        }
        overviewContent = overviewContent.replaceAll('{{cards}}', cards.join(''));
      }

      response = overviewContent;
      break;
    }
    case '/product': {
      if (!reqUrlParts[1]) {
        response = '<h1>PAGE NOT FOUND</h1>';
        break;
      }

      let prodTemplate = fs.readFileSync(
        './templates/product.html',
        'utf8',
      );

      const data = JSON.parse(fs.readFileSync(
        './dev-data/data.json',
        'utf8',
      )).find(item => `${item['id']}` === reqUrlParts[1]);

      if (data && data instanceof Object) {
        data['organic'] = data['organic'] ? 'organic' : 'inorganic';
        Object.keys(data).forEach(key => {
          prodTemplate = prodTemplate.replaceAll(`{{${key}}}`, data[key]);
        });
      } else {
        response = '<h1>PRODUCT NOT FOUND</h1>';
        break;
      }
      response = prodTemplate;
      break;
    }
    case '/api': {
      res.setHeader('Content-Type', 'application/json; charset=utf8');
      const data = fs.readFileSync(
        './dev-data/data.json',
        'utf8',
      );
      if (!reqUrlParts[1]) {
        response = data;
        break;
      }

      const json = JSON.parse(data);
      const id = parseInt(reqUrlParts[1]);
      if (isNaN(id) || id < 0 || id >= json.length) {
        response = '<h1>PAGE NOT FOUND</h1>';
        break;
      }

      response = JSON.stringify(json[id]);
      break;
    }
    default: {
      response = '<h1>PAGE NOT FOUND</h1>';
      break;
    }
  }
  res.end(response);
});

server.listen(port, host, () => {
  console.log(`Server started: http://${host}:${port}`);
});
