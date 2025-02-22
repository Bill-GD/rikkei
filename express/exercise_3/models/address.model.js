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
    const [data, fields] = await db.execute('select * from address where id = ?', [id]);
    return data.map(e => new AddressModel(
      e.id,
      e.street,
      e.suite,
      e.city,
      e.zipcode,
      e.lat,
      e.lng,
    ))[0];
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
