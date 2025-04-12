import AuthService from '../service/auth.service.js';
import UserService from '../service/user.service.js';

export default class AuthController {
  static async register(req, res) {
    const { username, email, password } = req.body;
    const nextId = await UserService.getNextId();
    await AuthService.register(nextId, username, email, password);
    res.status(201).json({
      message: 'User registered successfully',
      id: nextId,
    });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);
    res.cookie('token', token, { maxAge: 1000 * 60 });
    res.status(200).json({
      message: 'Login successfully',
      token,
    });
  }
}
