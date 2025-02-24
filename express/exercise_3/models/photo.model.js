import db from '../database/database.js';

export class PhotoModel {
  /**
   * @param id {number}
   * @param albumId {number}
   * @param title {string}
   * @param url {string}
   * @param thumbnailUrl {string}
   */
  constructor(id, albumId, title, url, thumbnailUrl) {
    this.id = id;
    this.albumId = albumId;
    this.title = title;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl;
  }

  /**
   * @returns {{id: number, albumId: number, title: string, url: string, thumbnail: string}}
   */
  toJson() {
    return {
      id: this.id,
      albumId: this.albumId,
      title: this.title,
      url: this.url,
      thumbnail: this.thumbnailUrl,
    };
  }

  /**
   * Parse the raw data from the `photo` table in the database to `PhotoModel` object.
   * @param json {{ id: number, album_id: number, title: string, url: string, thumbnail: string, }}
   */
  static fromTable(json) {
    return new PhotoModel(
      json.id,
      json.album_id,
      json.title,
      json.url,
      json.thumbnail,
    );
  }

  /**
   * @param {number} albumId Optional album ID.
   * @param {string} field Optional sort field.
   * @param {'asc'|'desc'} order Optional sort order.
   * @param {number} page Optional pagination page number.
   * @param {number} limit Optional pagination limit.
   * @returns {Promise<PhotoModel[]>}
   */
  static async getAll(albumId = -1, field = 'id', order = 'asc', page = -1, limit = -1) {
    const [data, _] = await db.execute(
      `select *
       from photo ${albumId < 0 ? '' : 'where album_id = ?'}
       order by ${field} ${order}` +
      (page < 0 || limit < 0 ? '' : ` limit ${limit} offset ${limit * (page - 1)}`),
      [albumId],
    );
    return data.map(PhotoModel.fromTable);
  }
}
