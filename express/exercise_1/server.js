import app from './app.js';
import './routes/all_routes.js';

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
