import app from './app.js';
app.listen(process.env.PORT, () => {
  console.log(`Auth service running on port ${process.env.PORT}`);
});
