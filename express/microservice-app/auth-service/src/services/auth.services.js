import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import db from '../../config/db.js';
import UserService from './user.services.js';

export default class AuthService {
  static async register(email, password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const [id] = await UserService.createOne(email, hash);
    return { id, email, hash };
  }

  static async signIn(email, password) {
    console.log('Hello world !!!!');
    let result = await db('user').select('*').where('email', email);

    if (result.length === 0) {
      return {
        message: `User with email: ${email} not existed`,
      };
    } else {
      let [user] = result;
      let comparedResult = await bcrypt.compare(password, user.password);
      if (comparedResult) {
        let token = jwt.sign(
          { user_id: user.id, role: user.role },
          process.env.TOKEN_SECRET,
          { expiresIn: 1 * 60 },
        );
        return token;
      } else {
        return {
          message: `Password is incorrect`,
        };
      }
    }
  }
}
