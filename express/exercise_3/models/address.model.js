import db from '../database/database.js';

export class AddressModel {
  /**
   * @param id {number}
   * @param street {string}
   * @param suite {string}
   * @param city {string}
   * @param zipcode {string}
   * @param latitude {number}
   * @param longitude {number}
   */
  constructor(id, street, suite, city, zipcode, latitude, longitude) {
    this.id = id;
    this.street = street;
    this.suite = suite;
    this.city = city;
    this.zipcode = zipcode;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  static async get(id) {
    const [data, _] = await db.execute('select * from address where id = ?', [id]);
    const first = data[0];
    return new AddressModel(first.id, first.street, first.suite, first.city, first.zipcode, first.lat, first.lng);
  }

  static async getByZip(zip) {
    const [data, _] = await db.execute('select * from address where zipcode = ?', [zip]);
    const first = data[0];
    return new AddressModel(first.id, first.street, first.suite, first.city, first.zipcode, first.lat, first.lng);
  }

  static async hasAddressOfZip(zip) {
    const [data, _] = await db.execute('select count(*) count from address where zipcode = ?', [zip]);
    return data[0].count > 0;
  }

  toJson() {
    return {
      addressId: this.id,
      street: this.street,
      suite: this.suite,
      city: this.city,
      zipcode: this.zipcode,
      geo: {
        lat: this.latitude,
        lng: this.longitude,
      },
    };
  }
}
