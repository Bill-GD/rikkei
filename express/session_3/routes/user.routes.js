import express from 'express';
import db from '../database/database.js';

const router = express.Router();
// get all/one, post, put, delete

router.get('/', (req, res) => {
  console.log(process.env);
  db.execute('select * from user')
    .then(data => {
      res.json({
        message: 'Get all users',
        data: data[0],
      });
    })
    .catch(console.error);
  // mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   password: 'AMinecraftPlayer!',
  //   database: 'express_session_3',
  // }).then(conn => {
  //   return conn.query('select * from user;');
  //   // const [values, fields] = await
  //   // console.table(values);
  // }).then(data => {
  //   // const [values, fields] = data;
  //   // console.table(values);
  //   res.json({ message: 'Get all users', result: data[0] });
  // }).catch(err => {
  //   console.error(err);
  // });
  // res.json({ message: 'Get all users' });
});

router.get('/:id', (req, res) => {
  db.execute('select * from user where id = ?', [req.params.id])
    .then(data => {
      res.json({
        message: 'Get user by id',
        data: data[0],
      });
    })
    .catch(console.error);
});

router.post('/', (req, res) => {
  db.execute('insert into user (email, username, password) values (?, ?, ?)', [
      req.body.email,
      req.body.username,
      req.body.password,
    ])
    .then(data => {
      res.status(201).json({ message: 'Created new user', insertedId: data[0].insertId });
    })
    .catch(console.error);
});

router.put('/:id', (req, res) => {
  db.execute(
      'select * from user where id = ?',
      [req.params.id],
    )
    .then(data => data[0][0])
    .then(user => {
      db.execute(
        'update user set email = ?, username = ?, password = ? where id = ?',
        [
          req.body.email || user.email,
          req.body.username || user.username,
          req.body.password || user.password,
          req.params.id,
        ],
      );
      res.json({ message: 'Updated user by id' });
    })
    .catch(console.error);
});

router.delete('/:id', (req, res) => {
  db.execute('delete from user where id = ?', [req.params.id])
    .then(data => {
      res.json({ message: 'Deleted user by id' });
    })
    .catch(console.error);
});

export default router;
