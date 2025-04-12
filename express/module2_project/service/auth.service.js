import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserService from './user.service.js';

export default class AuthService {
  static async register(id, username, email, password, role = 'user') {
    const salt = bcrypt.genSaltSync(),
      hashed = bcrypt.hashSync(password, salt);

    return await UserService.addUser(id, username, email, hashed, role);
  }

  static async login(email, password) {
    const user = await UserService.getUser({ email });
    if (!bcrypt.compareSync(password, user.password)) {
      throw Error('Wrong password');
    }
    return jwt.sign(
      {
        userId: user.userId,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_LIFETIME_SEC },
    );
  }
}
