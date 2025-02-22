import db from '../database/database.js';
import AddressModel from './address.model.js';
import CompanyModel from './company.model.js';
import InterestModel from './interest.model.js';

export default class UserModel {
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
    // const [interestData, f2] = await db.execute('select * from user_interest where user_id = ?', [id]);
    const users = [];
    for (const e of userData) {
      users.push(new UserModel(
        e.id,
        e.name,
        e.username,
        e.email,
        await AddressModel.get(e.address_id),
        e.phone,
        e.website,
        await CompanyModel.get(e.company_id),
        await InterestModel.getByUser(e.id),
      ));
    }
    return users;
  }

  static async getAllByPage(page, limit) {
    console.log(`page: ${page}, limit: ${limit}`);

    if (page === undefined || limit === undefined) {
      throw new Error('page and limit must be defined');
    }

    // maybe calling procedure specifically receives extra headers ?
    const [[userData, headers], fields] = await db.query(`call get_page_of(?, ?, ?)`, ['user', page, limit]);
    // const [interestData, f2] = await db.execute('select * from user_interest where user_id = ?', [id]);
    const users = [];
    for (const e of userData) {
      users.push(new UserModel(
        e.id,
        e.name,
        e.username,
        e.email,
        await AddressModel.get(e.address_id),
        e.phone,
        e.website,
        await CompanyModel.get(e.company_id),
        await InterestModel.getByUser(e.id),
      ));
    }
    return users;
  }

  static async get(id) {
    const [userData, f] = await db.execute('select * from user where id = ?', [id]);
    // const [interestData, f2] = await db.execute('select * from user_interest where user_id = ?', [id]);
    const user = userData[0];
    return new UserModel(
      user.id,
      user.name,
      user.username,
      user.email,
      await AddressModel.get(user.address_id),
      user.phone,
      user.website,
      await CompanyModel.get(user.company_id),
      await InterestModel.getByUser(user.id),
    );
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
}
