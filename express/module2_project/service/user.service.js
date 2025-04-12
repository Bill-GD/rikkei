import db from '../config/db.js';
import UserModel from '../models/user.model.js';

export default class UserService {
  static async getNextId() {
    return (await db('user').max('user_id as max'))[0].max + 1;
  }

  static async hasUserByEmail(email) {
    const [{ count }] = await db('user').count('* as count').where({ email });
    return count > 0;
  }

  /**
   * Get all users and returns as a list of UserModel objects.
   * @returns {Promise<UserModel[]>}
   */
  static async getAllUsers() {
    const users = await db('user').select('user_id', 'username', 'email', 'role');
    return users.map(e => new UserModel(e.user_id, e.username, e.email, '', e.role));
  }

  /**
   * Get the user and returns as a UserModel object.
   * @param {string} email Should be a valid, existing email. Should be used after checking using a middleware.
   * @returns {Promise<UserModel>}
   */
  static async getUser(email) {
    const user = await db('user').where({ email }).first();
    return new UserModel(user.user_id, user.username, user.email, user.password, user.role);
  }

  static async addUser(id, username, email, hashedPassword, role) {
    return db('user').insert({
      user_id: id,
      username,
      email,
      password: hashedPassword,
      role,
    });
  }
}
