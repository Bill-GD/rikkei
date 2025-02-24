import db from '../database/database.js';

export class AlbumModel {
  /**
   * @param id {number}
   * @param userId {number}
   * @param title {string}
   */
  constructor(id, userId, title) {
    this.id = id;
    this.userId = userId;
    this.title = title;
  }

  /**
   * @returns {{id: number, title: string, userId: number}}
   */
  toJson = () => ({
    id: this.id,
    userId: this.userId,
    title: this.title,
  });

  /**
   * Parse the raw data from the `album` table in the database to `AlbumModel` object.
   * @param {{id: number, user_id: number, title: string}} json
   */
  static fromTable = json => new AlbumModel(json.id, json.user_id, json.title);

  /**
   * @param {number} userId Optional user ID.
   * @param {string} field Optional sort field.
   * @param {'asc'|'desc'} order Optional sort order.
   * @param {number} page Optional pagination page number.
   * @param {number} limit Optional pagination limit.
   * @returns {Promise<AlbumModel[]>}
   */
  static async getAll(userId = -1, field = 'id', order = 'asc', page = -1, limit = -1) {
    const [data, _] = await db.execute(
      `select *
       from album ${userId < 0 ? '' : 'where user_id = ?'}
       order by ${field} ${order}` +
      (page < 0 || limit < 0 ? '' : ` limit ${limit} offset ${limit * (page - 1)}`),
      [userId],
    );

    return data.map(AlbumModel.fromTable);
  }

  static async get(id) {
    const [data, _] = await db.execute('select * from album where id = ?', [id]);
    return AlbumModel.fromTable(data[0]);
  }

  static async hasAlbumOfId(reqId) {
    const [data, _] = await db.execute('select count(*) count from album where id = ?', [reqId]);
    return data[0].count > 0;
  }

  static async hasAlbumOfTitle(title) {
    const [data, _] = await db.execute('select count(*) count from album where title = ?', [title]);
    return data[0].count > 0;
  }

  /**
   * Insert new album into database.
   * @param {Object} json Must be 1 level deep, with `non-null` fields in this order:
   * `userId`, `title`.
   * @return The new ID of the album.
   */
  static async add(json) {
    const insertRes = await db.execute(
      'insert into album (user_id, title) values' +
      '(?, ?)',
      [...Object.values(json)],
    );
    return insertRes[0].insertId;
  }

  static async update(id, title) {
    await db.execute('update album set title = ? where id = ?', [title, id]);
  }

  static async delete(id) {
    await db.execute('delete from album where id = ?', [id]);
    await db.query('call reset_auto_increment(?)', ['album']);
  }
}
