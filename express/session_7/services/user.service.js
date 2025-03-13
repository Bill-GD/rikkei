import db from '../config/database.js';

export default class UserService {
  static async getAll() {}

  static getOne() {}

  static async createOne(email, hash) {
    const nextId = await UserService.getNextId();
    await db('user').insert({ id: nextId, email, password: hash });
    return nextId;
  }

  static updateOne() {}

  static deleteOne() {}

  static async getNextId() {
    return (await db('user').max('id as max'))[0].max + 1;
  }
}
