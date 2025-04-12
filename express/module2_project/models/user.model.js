import db from '../config/db.js';

export default class UserModel {
  userId;
  username;
  email;
  role;

  constructor(userId, username, email, role) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.role = role;
  }

  static async getNextId() {
    return (await db('user').max('user_id as max'))[0].max + 1;
  }

  static async getAllUsers() {
    return db('user').select('user_id', 'username', 'email', 'role');
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

  static async hasUserByEmail(email) {
    const [{ count }] = await db('user').count('* as count').where({ email });
    return count > 0;
  }
}
