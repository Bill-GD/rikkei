import bcrypt from 'bcryptjs';
import UserModel from '../models/user.model.js';

export default class AuthService {
  static async register(id, username, email, password, role = 'user') {
    const salt = bcrypt.genSaltSync(),
      hashed = bcrypt.hashSync(password, salt);

    return await UserModel.addUser(id, username, email, hashed, role);
  }
}
