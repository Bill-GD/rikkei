import express from 'express';
import db from '../config/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // const designedArchitects = (await db('design').distinct('architect_id')).map(e => e.architect_id);
    // console.log(designedArchitects);
    // const result = await db('architect').whereNotIn('id', designedArchitects);
    // .select('place')
    // .select('name as fullname');
    // .where('birthday', '>', 1956);
    // .where({ place: 'ha noi' })
    // .orWhereBetween('birthday', [1960, 1970])
    // .orWhere('name', 'like', '%le%')
    // .orderBy('birthday', 'desc');
    // .count('id as count')
    // .groupBy('place');
    // .having('count', '>=', 2);
    // .limit(2)
    // .offset(2);
    const result = await db('design as d')
      .select('b.id as building_id', 'b.name as building_name', 'a.name as architect_name')
      .join('architect as a', 'a.id', 'd.architect_id')
      .join('building as b', 'b.id', 'd.building_id');
    res.json(result);

  } catch (err) {
    res.json({ message: 'An error has occurred', err });
  }
});

router.post('/', async (req, res) => {
  let { name, birthday, sex, place, address } = req.body;
  try {
    const [newId] = await db('architect').insert({ name, birthday, sex, place, address });
    res.json({ message: 'Added new architect', newId });
  } catch (err) {
    res.json({ message: 'An error has occurred', err });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const rowAffected = await db('architect').where({ id: req.params.id }).update(req.body);
    console.log(rowAffected);
    res.json({ message: 'Updated architect' });
  } catch (err) {
    res.json({ message: 'An error has occurred', err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const rowAffected = await db('architect').where({ id: req.params.id }).del();
    console.log(rowAffected);
    res.json({ message: 'Deleted architect' });
  } catch (err) {
    res.json({ message: 'An error has occurred', err });
  }
});

export default router;
