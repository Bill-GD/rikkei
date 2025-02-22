import db from '../database/database.js';
import UserModel from './user.model.js';

export default class CompanyModel {
  /**
   * @param id {number}
   * @param name {string}
   * @param catchPhrase {string}
   * @param business {string}
   */
  constructor(id, name, catchPhrase, business) {
    this.id = id;
    this.name = name;
    this.catchPhrase = catchPhrase;
    this.business = business;
  }

  static async get(id) {
    const [data, fields] = await db.execute('select * from company where id = ?', [id]);
    return data.map(e => new CompanyModel(e.id, e.name, e.catchphrase, e.business))[0];
  }

  toJson() {
    return {
      companyId: this.id,
      name: this.name,
      catchPhrase: this.catchPhrase,
      business: this.business,
    };
  }
}
