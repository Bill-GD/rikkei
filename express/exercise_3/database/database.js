import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DATABASE_PASSWORD,
  database: 'express_exercise_3',
});

// function addPhotosToDatabase() {
//   const photos = JSON.parse(readFileSync(`${__root}/dev-data/photos.json`, 'utf8'));
//
//   photos.forEach(async photo => {
//     const query = 'insert into photo (id, album_id, title, url, thumbnail) values (?, ?, ?, ?, ?)';
//     await db.query(query, [photo.id, photo.albumId, photo.title, photo.url, photo.thumbnailUrl]);
//   });
//
//   console.log('All photos inserted');
// }

export default db;
