import db from '../config/database.js';
import UserService from '../services/user.service.js';

export default class UserController {
  static async getAll(req, res) {
    res.json({
      message: 'GET ALL SUCCESSFULLY',
    });
  }

  static async getOne(req, res) {
    const user = await db('user').where({ id: req.params.id });
    res.json({
      message: 'GET ONE SUCCESSFULLY',
      user,
    });
  }

  static createOne(req, res) {
    // console.log(req.body);
    // console.log(req.file);
    res.json({
      message: 'POST ONE SUCCESSFULLY',
    });
  }

  static updateOne(req, res) {
    res.json({
      message: 'UPDATE ONE SUCCESSFULLY',
    });
  }

  static deleteOne(req, res) {
    res.json({
      message: 'DELETE ONE SUCCESSFULLY',
    });
  }
}
