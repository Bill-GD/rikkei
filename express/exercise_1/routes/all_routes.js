import app from '../app.js';
import homeRoutes from '../routes/home.js';
import apiV1Routes from '../routes/api_v1.js';
import overviewRoutes from '../routes/overview.js';
import productRoutes from '../routes/product.js';

app.use(homeRoutes);
app.use('/api/v1', apiV1Routes);
app.use('/overview', overviewRoutes);
app.use('/product', productRoutes);

// routes are matched in order, leftovers are caught here
app.use((req, res) => {
  res.status(404).send('<h1>PAGE NOT FOUND</h1>');
});
