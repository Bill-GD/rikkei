import knex from 'knex';
import knexConfig from './knex-config.js';
// import { readFileSync } from 'node:fs';

const db = knex(knexConfig.development);

// export async function insertData() {
//   const data = JSON.parse(readFileSync(`${process.cwd()}/data/data.json`, 'utf8'));
//
//   const allTags = data.map(e => e['tags']).reduce(
//     (p, c) => {
//       for (const newTag of c) {
//         if (p.map(e => e.tag_id).includes(newTag.tagId)) continue;
//         p.push({ tag_id: newTag.tagId, name: newTag.tagName });
//       }
//       return p;
//     },
//     [],
//   );
//   await db('tag').insert(allTags);
//
//   for (const productData of data) {
//     let { listing, comments, tags, ...product } = productData;
//
//     product = { product_id: product.id, product_name: product.productName, status: product.status };
//     comments = comments.map(e => ({ comment_id: e.commentId, content: e.content, product_id: product.product_id }));
//     listing = { ...listing, product_id: product.product_id };
//     tags = tags.map(e => ({ product_id: product.product_id, tag_id: e.tagId }));
//
//     await db('product').insert(product);
//     await db('comment').insert(comments);
//     await db('listing').insert(listing);
//     await db('product_tag').insert(tags);
//   }
//   console.log('Data inserted');
// }

export default db;
