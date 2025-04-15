import AuthService from '../service/auth.service.js';
import UserService from '../service/user.service.js';
import { requestError } from '../utils/responses.js';

export default class AuthController {
  static async register(req, res) {
    const { email } = req.body, username = req.body?.username, password = req.body?.password;

    if (password === undefined || username === undefined) {
      requestError(res, 'Username or password not provided');
      return;
    }

    const nextId = await UserService.getNextId();
    await AuthService.register(nextId, username, email, password);
    res.status(201).json({
      message: 'User registered successfully',
      id: nextId,
    });
  }

  static async login(req, res) {
    const { email } = req.body, password = req.body?.password;

    if (password === undefined) {
      requestError(res, 'Password not provided');
      return;
    }

    const token = await AuthService.login(email, password);
    res.cookie('token', token, { maxAge: 1e3 * parseInt(process.env.TOKEN_LIFETIME_SEC) });
    res.status(200).json({
      message: 'Login successfully',
      token,
    });
  }

  static logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successfully' });
  }
}
