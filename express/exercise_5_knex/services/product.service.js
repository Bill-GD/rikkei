import db from '../config/database.js';

export async function getAllProduct({ minRate, maxRate, sort, order, page, limit }) {
  const data = await db('product as p')
    .select('*')
    .join('listing as l', 'l.product_id', 'p.product_id')
    .whereBetween('l.rate', [minRate || 0, maxRate || 5])
    .orderBy(sort || 'p.product_id', order)
    .limit(limit)
    .offset((page - 1) * limit);

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

  return result;
}
