import db from '../config/database.js';

export class TagController {
  static async getAll(req, res) {
    try {
      let { product_id, page, limit, sort, order } = req.query;
      const query = db('tag as t');

      if (product_id) query
        .join('product_tag as pt', 'pt.tag_id', 't.tag_id')
        .where({ 'pt.product_id': product_id })
        .select('t.*');

      query.orderBy(`${product_id ? 't.' : ''}${sort || 'tag_id'}`, order);

      if (limit && page) query
        .limit(limit)
        .offset((page - 1) * limit);

      const tags = await query;
      res.json(tags);
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async addTag(req, res) {
    try {
      const { name } = req.body;
      const [tag_id] = await db('tag').insert({ name });
      res.status(201).json({ message: 'Added new tag', tag_id });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async getTagOfId(req, res) {
    try {
      const [tag] = await db('tag').where({ tag_id: req.params.id });
      res.json(tag);
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async updateTagOfId(req, res) {
    try {
      const { name } = req.body, tag_id = req.params.id;
      await db('tag').where({ tag_id }).update({ name });
      res.json({ message: `Updated tag of id ${tag_id}` });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async deleteTagOfId(req, res) {
    try {
      await db('tag').where({ tag_id: req.params.id }).del();
      await db.raw('call reset_auto_increment(?,?)', ['tag', 'tag_id']);
      res.json({ message: 'Deleted tag successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async getProductsOfTagId(req, res) {
    try {
      const tag_id = req.params.id;
      const [tag] = await db('tag').where({ tag_id });

      const products = await db('product as p')
        .join('product_tag as pt', 'pt.product_id', 'p.product_id')
        .select('p.*')
        .where({ 'pt.tag_id': tag_id });

      res.json({ tag, products });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }
}
