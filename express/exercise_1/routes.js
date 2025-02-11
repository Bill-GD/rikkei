const { app } = require('./app.js');
const OverviewController = require('./controllers/overview.js');
const ProductController = require('./controllers/product.js');

function initRoutes() {
  app.get('/', (req, res) => {
    res.send('Hello world');
  });

  app.get('/overview', OverviewController.index);
  app.get('/product', ProductController.index);
}

module.exports = initRoutes;
