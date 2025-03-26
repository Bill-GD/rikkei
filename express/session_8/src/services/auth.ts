import bcrypt from 'bcryptjs';
import UserService from './user.js';

export default class AuthService {
  static async register(name: string, email: string, password: string) {
    const salt: string = bcrypt.genSaltSync(10), hashedPassword: string = bcrypt.hashSync(password, salt);
    return await UserService.createOne(name, email, hashedPassword);
  }
}
