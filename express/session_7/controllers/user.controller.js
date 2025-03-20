import UserService from '../services/user.service.js';

export default class UserController {
  static async getAll(req, res) {
    res.json({
      message: 'GET ALL SUCCESSFULLY',
    });
  }

  static getOne(req, res) {
    res.json({
      message: 'GET ONE SUCCESSFULLY',
    });
  }

  static createOne(req, res) {
    console.log(req.body);
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
