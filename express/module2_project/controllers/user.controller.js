import UserModel from '../models/user.model.js';
import { internalError } from '../utils/responses.js';

export default class UserController {
  static async getUsers(req, res) {
    try {
      res.status(200).json(await UserModel.getAllUsers());
    } catch (error) {
      internalError(res, error);
    }
  }
}
