const { app } = require('../app.js');

app.use(require('../routes/home.js'));
app.use('/api/v1', require('./api_v1.js'));
app.use(require('../routes/overview.js'));
app.use(require('../routes/product.js'));

// routes are matched in order, leftovers are caught here
app.use((req, res) => {
  res.status(404).send('<h1>PAGE NOT FOUND</h1>');
});
