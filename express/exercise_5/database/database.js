import mysql from 'mysql2/promise';
// import { readFileSync } from 'node:fs';
// import { __root } from '../utils/helper.utils.js';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DATABASE_PASSWORD,
  database: 'express_exercise_5',
});

// export async function insertData() {
//   const data = JSON.parse(readFileSync(`${__root}/data/data.json`, 'utf8'));
//
//   const allTags = data.map(e => e['tags']).reduce(
//       (p, c) => {
//         for (const newTag of c) {
//           if (p.map(e => e.tagId).includes(newTag.tagId)) continue;
//           p.push(newTag);
//         }
//         return p;
//       },
//       [],
//     ),
//     tagPlaceholders = allTags.map(e => `(?,?)`).join(','),
//     tagValues = [];
//
//   for (const tag of allTags) {
//     tagValues.push(...Object.values(tag));
//   }
//
//   // tags insert
//   await db.execute(mysql.format(
//     `insert into tag (tag_id, name)
//      values ${tagPlaceholders}`,
//     tagValues,
//   ));
//
//   for (const productData of data) {
//     let { listing, comments, tags, ...product } = productData;
//     const prodId = product.id;
//
//     comments = comments.map(e => ({ ...e, productId: prodId }));
//     listing = { ...listing, productId: prodId };
//     tags = tags.map(e => ({ productId: prodId, tagId: e.tagId }));
//
//     const commentPlaceholders = comments.map(e => `(?,?,?)`).join(','),
//       tagRelPlaceholders = tags.map(e => '(?,?)').join(','),
//       commentValues = [],
//       tagValues = [];
//
//     for (const comment of comments) {
//       commentValues.push(...Object.values(comment));
//     }
//     for (const tag of tags) {
//       tagValues.push(...Object.values(tag));
//     }
//
//     // product
//     await db.execute(mysql.format(
//       `insert into product (product_id, product_name, status)
//        values (?, ?, ?)`,
//       Object.values(product),
//     ));
//
//     // listing
//     await db.execute(mysql.format(
//       `insert into listing (description, price, rate, product_id)
//        values (?, ?, ?, ?)`,
//       Object.values(listing),
//     ));
//
//     // comments
//     await db.execute(mysql.format(
//       `insert into comment (comment_id, content, product_id)
//        values ${commentPlaceholders}`,
//       commentValues,
//     ));
//
//     // tags
//     await db.execute(mysql.format(
//       `insert into product_tag (product_id, tag_id)
//        values ${tagRelPlaceholders}`,
//       tagValues,
//     ));
//   }
//   console.log('Data inserted');
// }

export default db;
