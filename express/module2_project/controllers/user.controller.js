import UserService from '../service/user.service.js';

export default class UserController {
  static async getUsers(req, res) {
    res.status(200).json((await UserService.getAllUsers()).map(e => e.toJson()));
  }
}
