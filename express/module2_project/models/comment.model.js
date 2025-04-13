export default class CommentModel {
  #commentId;
  #content;

  constructor(commentId, content) {
    this.#commentId = commentId;
    this.#content = content;
  }

  toJson() {
    return {
      commentId: this.#commentId,
      content: this.#content,
    };
  }

  fromJson(json) {
    if (!json.comment_id) throw new Error('CommentModel is being created without comment_id');

    return new CommentModel(
      json.comment_id,
      json.content,
    );
  }
}
