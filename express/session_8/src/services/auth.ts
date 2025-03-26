import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import db from '../config/database.js';
import UserService from './user.js';

export default class AuthService {
  static async register(name: string, email: string, password: string, avatar: string | undefined) {
    const salt: string = bcrypt.genSaltSync(10), hashedPassword: string = bcrypt.hashSync(password, salt);
    return await UserService.createOne(name, email, hashedPassword, avatar);
  }
  
  static async login(email: string, password: string) {
    const user = await db('user').where({ email }).first();
    if (!bcrypt.compareSync(password, user.password)) {
      throw Error('Wrong password');
    }
    return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: 60 });
  }
}
