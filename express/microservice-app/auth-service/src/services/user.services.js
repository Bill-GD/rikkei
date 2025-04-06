import db from '../../config/db.js';

export default class UserService {
  static async getAll() {}

  static async getOne(id) {
    return await db('user').where('id', id).first();
  }

  static async createOne(email, password) {
    return await db('user').insert({
      email: email,
      password: password,
    });
  }
}
