import UserModel from '../models/user.model.js';

export default class UserController {
  static async getUsers(req, res) {
    res.status(200).json(await UserModel.getAllUsers());
  }
}
