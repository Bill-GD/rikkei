import db from '../config/database.js';

export class ProductController {
  static async getAll(req, res) {
    try {
      const data = await db('product as p')
        .select('*')
        .join('listing as l', 'l.product_id', 'p.product_id')
        .whereBetween('l.rate', [req.query.minRate || 0, req.query.maxRate || 5])
        .orderBy(req.query.sort || 'p.product_id', req.query.order)
        .limit(req.query.limit)
        .offset((req.query.page - 1) * req.query.limit);

      const result = [];
      for (const prod of data) {
        const comments = await db('comment')
            .select('comment_id', 'content')
            .where({ product_id: prod.product_id }),
          tags = await db('tag as t')
            .select('t.*')
            .join('product_tag as pt', 't.tag_id', 'pt.tag_id')
            .where({ product_id: prod.product_id });

        result.push({
          product_id: prod.product_id,
          product_name: prod.product_name,
          status: prod.status,
          listing: {
            description: prod.description,
            price: prod.price,
            rate: prod.rate,
          },
          comments,
          tags,
        });
      }

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

      res.json({ message: 'Added new product', product_id });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async addCommentForProduct(req, res) {
    try {
      const [comment_id] = await db('comment').insert({ content: req.body.content, product_id: req.params.id });
      res.json({ message: `Added new comment for product of id ${req.params.id}`, comment_id });
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
