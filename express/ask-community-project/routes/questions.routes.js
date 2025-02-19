import express from 'express';
const router = express.Router();

router.get('/:id', (req, res) => {
  res.send('<h1>This is question detail page</h1>');
})

export default router;
