export default class CommentModel {
  #commentId;
  #uploaderId;
  #content;

  constructor(commentId, uploaderId, content) {
    this.#commentId = commentId;
    this.#uploaderId = uploaderId;
    this.#content = content;
  }

  toJson() {
    return {
      commentId: this.#commentId,
      uploaderId: this.#uploaderId,
      content: this.#content,
    };
  }

  static fromJson(json) {
    if (!json.comment_id) throw new Error('CommentModel is being created without comment_id');

    return new CommentModel(
      json.comment_id,
      json.uploader_id,
      json.content,
    );
  }
}
