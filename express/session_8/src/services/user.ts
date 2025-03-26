import db from '../config/database.js';

export default class UserService {
  static async createOne(name: string, email: string, hashedPassword: string) {
    const nextId = await UserService.getNextId();
    await db('user').insert({ userId: nextId, name, email, password: hashedPassword });
    return nextId;
  }
  
  static async getNextId(): Promise<number> {
    return (await db('user').max('userId as max'))[0].max + 1;
  }
}
