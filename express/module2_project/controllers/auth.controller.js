import UserModel from '../models/user.model.js';
import AuthService from '../service/auth.service.js';
import { internalError } from '../utils/responses.js';

export default class AuthController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const nextId = await UserModel.getNextId();
      await AuthService.register(nextId, username, email, password);
      res.status(201).json({
        message: 'User registered successfully',
        id: nextId,
      });
    } catch (error) {
      internalError(res, error);
    }
  }

  static async login(req, res) {
    try {

    } catch (error) {
      internalError(res, error);
    }
  }
}
