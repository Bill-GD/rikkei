const { app } = require('./app.js');
const initRoutes = require('./routes.js');

const port = 3000;

initRoutes();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
