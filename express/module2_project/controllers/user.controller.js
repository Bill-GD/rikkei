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

  static async updateUser(req, res) {
    const { id } = req.params, username = req.body?.username;
    if (username === undefined) {
      res.status(400).json({ message: `New username not provided` });
      return;
    }
    await UserService.updateUser(id, username);
    res.status(200).json({ message: `User's username updated successfully` });
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    await UserService.deleteUser(id);
    if (!req.authenticatedUser.isAdmin) res.clearCookie('token');

    res.status(200).json({ message: 'User deleted successfully' });
  }
}
