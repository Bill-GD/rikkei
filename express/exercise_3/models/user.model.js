import db from '../database/database.js';
import { AddressModel } from './address.model.js';
import { CompanyModel } from './company.model.js';
import { InterestModel } from './interest.model.js';

export class UserModel {
  /**
   * @param id {number}
   * @param name {string}
   * @param username {string}
   * @param email {string}
   * @param address {AddressModel}
   * @param phone {string}
   * @param website {string}
   * @param company {CompanyModel}
   * @param interests {InterestModel[]}
   */
  constructor(id, name, username, email, address, phone, website, company, interests) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.website = website;
    this.company = company;
    this.interests = interests;
  }

  static async getAll() {
    const [userData, f] = await db.execute('select * from user');

    const users = [];
    for (const e of userData) {
      users.push(await UserModel.fromTable(e));
    }
    return users;
  }

  static async getAllByPage(page, limit) {
    // maybe calling procedure specifically receives extra headers ?
    const [[userData, headers], fields] = await db.query(`call get_page_of(?, ?, ?)`, ['user', page, limit]);

    const users = [];
    for (const e of userData) {
      users.push(await UserModel.fromTable(e));
    }
    return users;
  }

  static async getSorted(field, order = 'asc') {
    const [userData, f] = await db.execute(`select * from user order by ${field} ${order}`);

    const users = [];
    for (const e of userData) {
      users.push(await UserModel.fromTable(e));
    }
    return users;
  }

  static async get(id) {
    const [userData, f] = await db.execute('select * from user where id = ?', [id]);
    return await UserModel.fromTable(userData[0]);
  }

  static async hasUserId(id) {
    const [userData, f] = await db.execute('select count(id) as count from user where id = ?', [id]);
    return userData[0].count > 0;
  }

  static async hasUserEmail(email) {
    const [userData, f] = await db.execute('select count(id) as count from user where email = ?', [email]);
    return userData[0].count > 0;
  }

  async update() {

  }

  toJson() {
    const { addressId, ...address } = this.address.toJson();
    const { companyId, ...company } = this.company.toJson();
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      email: this.email,
      address: address,
      phone: this.phone,
      website: this.website,
      company: company,
      interests: this.interests.map(e => e.name),
    };
  }

  /**
   * Parse the raw data from the `user` table in the database to `UserModel` object.
   * @param json {Object}
   * @returns {Promise<UserModel>}
   */
  static async fromTable(json) {
    return new UserModel(
      json.id,
      json.name,
      json.username,
      json.email,
      await AddressModel.get(json.address_id),
      json.phone,
      json.website,
      await CompanyModel.get(json.company_id),
      await InterestModel.getByUser(json.id),
    );
  }
}
