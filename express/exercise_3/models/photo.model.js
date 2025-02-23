import { AddressModel } from './address.model.js';
import { CompanyModel } from './company.model.js';

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
      thumbnailUrl: thumbnailUrl,
    };
  }

  /**
   * Parse the raw data from the `photo` table in the database to `PhotoModel` object.
   * @param json {{ id: number, album_id: number, title: string, url: string, thumbnail: string, }}
   */
  static async fromTable(json) {
    return new PhotoModel(
      json.id,
      json.album_id,
      json.title,
      json.url,
      json.thumbnail,
    );
  }
}
