import db from '../database/database.js';
import { AddressModel } from './address.model.js';
import { CompanyModel } from './company.model.js';

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
   * @param interests {string[]}
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

  /**
   * @returns {Promise<UserModel[]>}
   */
  static async getAll() {
    const [data, f] = await db.execute('select * from user');

    const res = [];
    for (const e of data) {
      res.push(await UserModel.fromTable(e));
    }
    return res;
  }

  /**
   * @returns {Promise<UserModel[]>}
   */
  static async getAllByPage(page, limit) {
    // maybe calling procedure specifically receives extra headers ?
    const [[data, headers], fields] = await db.query(`call get_page_of(?, ?, ?)`, ['user', page, limit]);

    const res = [];
    for (const e of data) {
      res.push(await UserModel.fromTable(e));
    }
    return res;
  }

  /**
   *
   * @param {string} field
   * @param {'asc'|'desc'} order
   * @returns {Promise<UserModel[]>}
   */
  static async getSorted(field, order = 'asc') {
    const [data, f] = await db.execute(`select *
                                        from user
                                        order by ${field} ${order}`);

    const res = [];
    for (const e of data) {
      res.push(await UserModel.fromTable(e));
    }
    return res;
  }

  static async get(id) {
    const [data, f] = await db.execute('select * from user where id = ?', [id]);
    return await UserModel.fromTable(data[0]);
  }

  static async hasUserId(id) {
    const [data, f] = await db.execute('select count(id) count from user where id = ?', [id]);
    return data[0].count > 0;
  }

  static async hasUserEmail(email) {
    const [data, f] = await db.execute('select count(id) count from user where email = ?', [email]);
    return data[0].count > 0;
  }

  /**
   * Insert new user into database.
   * @param {Object} json Must be 1 level deep, with `non-null` fields in this order:
   * `name`, `username`, `email`, `phone`, `website`, `companyId`, `addressId`, `interests`.
   * @return The new ID of the user.
   */
  static async add(json) {
    const insertRes = await db.execute(
      'insert into user (name, username, email, phone, website, company_id, address_id, interests) ' +
      'values (?, ?, ?, ?, ?, ?, ?, ?)',
      [...Object.values(json)],
    );
    return insertRes[0].insertId;
  }

  /**
   * Update user with the specified ID.
   * @param {number|string} id
   * @param {Object} json Must be 1 level deep, with `non-null` fields in this order:
   * `name`, `username`, `email`, `phone`, `website`, `interests`.
   */
  static async update(id, json) {
    await db.execute(
      'update user ' +
      'set name = ?, username = ?, email = ?, phone = ?, website = ?, interests = ? ' +
      'where id = ?',
      [...Object.values(json), id],
    );
  }

  static async delete(id) {
    await db.execute('delete from user where id = ?', [id]);
    await db.query('call reset_auto_increment(?)', ['user']);
  }

  /**
   * @returns {{website: string, address: Omit<{zipcode: *, geo: {lng: *, lat: *}, suite: *, city: *, street: *, addressId: *}, 'addressId'>, phone: string, name: string, company: Omit<{companyId: *, catchPhrase: *, business: *, name: *}, 'companyId'>, id: number, interests: string[], email: string, username: string}}
   */
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
      interests: this.interests,
    };
  }

  /**
   * Parse the raw data from the `user` table in the database to `UserModel` object.
   * @param json {{
   *    id: number,
   *    name: string,
   *    username: string,
   *    email: string,
   *    address_id: number,
   *    phone: string,
   *    website: string,
   *    company_id: number,
   *    interests: string|string[],
   * }}
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
      json.interests === '' ? [] : json.interests.split('|'),
    );
  }
}
