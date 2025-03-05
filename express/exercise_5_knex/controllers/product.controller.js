import db from '../config/database.js';
import { getAllProduct } from '../services/product.service.js';

export class ProductController {
  static async getAll(req, res) {
    try {
      const result = await getAllProduct({
        minRate: req.query.minRate,
        maxRate: req.query.maxRate,
        sort: req.query.sort,
        order: req.query.order,
        page: req.query.page,
        limit: req.query.limit,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async getProductOfId(req, res) {
    try {
      const [data] = await db('product as p')
        .select('*')
        .join('listing as l', 'l.product_id', 'p.product_id')
        .where({ 'p.product_id': req.params.id });

      const comments = await db('comment')
          .select('comment_id', 'content')
          .where({ product_id: data.product_id }),
        tags = await db('tag as t')
          .select('t.*')
          .join('product_tag as pt', 't.tag_id', 'pt.tag_id')
          .where({ product_id: data.product_id });

      res.json({
        product_id: data.product_id,
        product_name: data.product_name,
        status: data.status,
        listing: {
          description: data.description,
          price: data.price,
          rate: data.rate,
        },
        comments,
        tags,
      });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async getListingOfId(req, res) {
    try {
      const [listing] = await db('listing')
        .select('description', 'price', 'rate')
        .where({ product_id: req.params.id });
      res.json(listing);
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async getTagsOfId(req, res) {
    try {
      const tags = await db('tag as t')
        .join('product_tag as pt', 'pt.tag_id', 't.tag_id')
        .select('t.*')
        .where({ 'pt.product_id': req.params.id });
      res.json(tags);
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async getCommentsOfId(req, res) {
    try {
      const comments = await db('comment')
        .select('comment_id', 'content')
        .where({ product_id: req.params.id });
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async addProduct(req, res) {
    try {
      let { product_name, description, price, rate, tags } = req.body;
      const product = { product_name };

      const [product_id] = await db('product').insert(product);

      const listing = { description, price, rate, product_id };
      await db('listing').insert(listing);

      const product_tags = [];
      for (const name of tags) {
        const [tag] = await db('tag').select('tag_id').where({ name });
        if (tag) product_tags.push({ tag_id: tag.tag_id, product_id });
        else {
          const [newId] = await db('tag').insert({ name });
          product_tags.push({ tag_id: newId, product_id });
        }
      }

      await db('product_tag').insert(product_tags);

      res.status(201).json({ message: 'Added new product', product_id });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async addCommentForProduct(req, res) {
    try {
      const [comment_id] = await db('comment').insert({ content: req.body.content, product_id: req.params.id });
      res.status(201).json({ message: `Added new comment for product of id ${req.params.id}`, comment_id });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async updateProductOfId(req, res) {
    try {
      const { product, listing } = req.body;

      if (product) await db('product').where({ product_id: req.params.id }).update(product);
      if (listing) await db('listing').where({ product_id: req.params.id }).update(listing);

      res.json({ message: 'Updated product of id' });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async deleteProductOfId(req, res) {
    try {
      await db('product').where({ product_id: req.params.id }).del();
      await db.raw('call reset_auto_increment(?,?)', ['product', 'product_id']);
      await db.raw('call reset_auto_increment(?,?)', ['comment', 'comment_id']);
      res.json({ message: 'Deleted product of id' });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }
}
