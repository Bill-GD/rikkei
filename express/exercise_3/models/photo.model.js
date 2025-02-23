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
   * @returns {{albumId: number, id: number, title: string, url: string, thumbnailUrl: string}}
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
   * @param {number} albumId Optional album ID, defaults to -1;
   * @returns {Promise<PhotoModel[]>}
   */
  static async getAll(albumId = -1) {
    const [data, f] = await db.execute(
      `select *
       from photo ${albumId < 0 ? '' : 'where album_id = ?'}`,
      [albumId],
    );
    return data.map(PhotoModel.fromTable);
  }

  /**
   * @param {number} albumId Optional album ID, defaults to -1;
   * @param {string} field
   * @param {'asc'|'desc'} order
   * @returns {Promise<PhotoModel[]>}
   */
  static async getSorted(albumId = -1, field, order) {
    const [data, f] = await db.execute(
      `select *
       from photo ${albumId < 0 ? '' : 'where album_id = ?'}
       order by ${field} ${order}`,
      [albumId],
    );
    return data.map(PhotoModel.fromTable);
  }
}
