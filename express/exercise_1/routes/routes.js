const { app } = require('../app.js');

app.use(require('../routes/home.js'));
app.use(require('../routes/api.js'));
app.use(require('../routes/overview.js'));
app.use(require('../routes/product.js'));

// catcher
app.use((req, res) => {
  res.send('<h1>PAGE NOT FOUND</h1>');
});
