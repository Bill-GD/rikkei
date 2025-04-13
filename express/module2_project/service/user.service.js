import db from '../config/db.js';
import UserModel from '../models/user.model.js';

export default class UserService {
  static async getNextId() {
    return (await db('user').max('user_id as max'))[0].max + 1;
  }

  /**
   * Get the user and returns as a UserModel object.
   * This middleware should only be used after verifying that the user exists.
   * @param {{id?: number, email?: string}} params
   * @returns {bool}
   */
  static async hasUser(params) {
    const query = db('user');

    if (params.id) query.where({ user_id: params.id });
    if (params.email) query.where({ email: params.email });

    const result = await query.first();
    return !!result;
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
   * This middleware should only be used after verifying that the user exists.
   * @param {{id?: number, email?: string}} params
   * @returns {Promise<UserModel>}
   */
  static async getUser(params) {
    const query = db('user');

    if (params.id) query.where({ user_id: params.id });
    if (params.email) query.where({ email: params.email });

    const user = await query.first();
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

  static async updateUser(id, username) {
    await db('user').where({ user_id: id }).update({ username });
  }

  static async deleteUser(id) {
    await db('user').where({ user_id: id }).del();
  }
}
