import db from '../config/database.js';

export default class UserService {
  static async createOne(name: string, email: string, hashedPassword: string, avatar: string | undefined) {
    const nextId = await UserService.getNextId();
    await db('user').insert({ userId: nextId, name, email, password: hashedPassword, avatar: avatar ?? null });
    return nextId;
  }
  
  static async hasUserByEmail(email: string): Promise<boolean> {
    const result = await db('user').where({ email }).first();
    return !!result; // om...
  }
  
  static async getNextId(): Promise<number> {
    return (await db('user').max('userId as max'))[0].max + 1;
  }
}
