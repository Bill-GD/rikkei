import e, { json } from 'express';

export default class PostModel {
  #postId;
  #uploaderId;
  #content;
  #imagePath;
  #likeCount;
  /**
   * @type {Date}
   */
  #dateCreated;
  /**
   * @type {CommentModel[]}
   */
  #comments = [];

  constructor(postId, uploaderId, content, imagePath, likeCount, dateCreated) {
    this.#postId = postId;
    this.#uploaderId = uploaderId;
    this.#content = content;
    this.#imagePath = imagePath;
    this.#likeCount = likeCount;
    // this.#dateCreated = new Date(Date.parse(dateCreated));
    this.#dateCreated = dateCreated;
  }

  toJson(includeComments = false) {
    return {
      postId: this.#postId,
      uploaderId: this.#uploaderId,
      content: this.#content,
      imagePath: this.#imagePath,
      likeCount: this.#likeCount,
      dateCreated: this.#dateCreated,
      comments: includeComments ? this.#comments.map(e => e.toJson()) : undefined,
    };
  }

  static fromJson(json) {
    if (!json.post_id) throw new Error('PostModel is being created without post_id');

    return new PostModel(
      json.post_id,
      json.uploader_id,
      json.content,
      json.image_path,
      json.like_count,
      json.date_created,
    );
  }

  /**
   * @param {CommentModel[]} comments
   */
  addComments(comments) {
    this.#comments.push(...comments);
  }

  get postId() {
    return this.#postId;
  }

  get uploaderId() {
    return this.#uploaderId;
  }

  get content() {
    return this.#content;
  }

  get imagePath() {
    return this.#imagePath;
  }

  get likeCount() {
    return this.#likeCount;
  }

  get dateCreated() {
    return this.#dateCreated;
  }

  get comments() {
    return this.#comments;
  }

}
