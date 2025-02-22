import db from '../database/database.js';

export default class InterestModel {
  /**
   * @param id {number}
   * @param name {string}
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static async getByUser(userId) {
    const [data, fields] = await db.execute(
      'select * from interest i ' +
      'inner join user_interest ui on i.id = ui.interest_id ' +
      'where ui.user_id = ?',
      [userId],
    );
    return data.map(e => new InterestModel(e.id, e.name));
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
