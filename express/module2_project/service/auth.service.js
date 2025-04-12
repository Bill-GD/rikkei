import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

export default class AuthService {
  static async register(id, username, email, password, role = 'user') {
    const salt = bcrypt.genSaltSync(),
      hashed = bcrypt.hashSync(password, salt);

    return await UserModel.addUser(id, username, email, hashed, role);
  }

  static async login(email, password) {
    const user = await UserModel.getUser(email);
    if (!bcrypt.compareSync(password, user.password)) {
      throw Error('Wrong password');
    }
    return jwt.sign(
      {
        userId: user.userId,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 }, // 60s
    );
  }
}
