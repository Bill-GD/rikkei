import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h1>This is homepage</h1>')
});

export default router;
