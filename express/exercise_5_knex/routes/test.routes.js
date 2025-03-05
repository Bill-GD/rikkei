import express from 'express';
import db from '../config/database.js';

const router = express.Router();

router.get('/tags', async (req, res) => {
  const tags = await db('tag').select('*');
  res.render('tags', { title: 'Test EJS route', tags });
});

router.get('/products', async (req, res) => {
  const products = await db('product').select('*');
  res.render('products', { products });
});

export default router;
