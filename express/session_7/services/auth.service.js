import db from '../config/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserService from './user.service.js';

export default class AuthService {
  static async register(email, password, avatar) {
    const salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync(password, salt);
    console.log(hash);
    return await UserService.createOne(email, hash, avatar);
  }

  static async signIn(email, password) {
    const result = await db('user').where({ email });
    // console.log(result);
    if (result.length <= 0) {
      throw Error('User with this email doesn\'t exist');
    }
    const [user] = result;
    if (!bcrypt.compareSync(password, user.password)) {
      throw Error('Wrong password');
    }
    return jwt.sign(
      { id: user.id, email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: 60 },
    );
  }
}
