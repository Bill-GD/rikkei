import UserService from '../service/user.service.js';

export default class UserController {
  static async getUsers(req, res) {
    res.status(200).json((await UserService.getAllUsers()).map(e => e.toJson()));
  }

  static async getUser(req, res) {
    const { id } = req.params;
    const user = await UserService.getUser({ id });
    res.status(200).json(user.toJson());
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    await UserService.deleteUser(id);
    if (!req.authenticatedUser.isAdmin) res.cookie('token', '');

    res.status(200).json({ message: 'User deleted successfully' });
  }
}
