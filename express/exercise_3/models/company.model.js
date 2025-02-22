import db from '../database/database.js';

export class CompanyModel {
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
    const first = data[0];
    return new CompanyModel(first.id, first.name, first.catchphrase, first.business);
  }

  static async getByName(name) {
    const [data, fields] = await db.execute('select * from company where name = ?', [name]);
    const first = data[0];
    return new CompanyModel(first.id, first.name, first.catchphrase, first.business);
  }

  static async hasCompanyOfName(name) {
    const [data, fields] = await db.execute('select count(*) count from company where name = ?', [name]);
    return data[0].count > 0;
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
