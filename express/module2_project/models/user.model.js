export default class UserModel {
  #userId;
  #username;
  #email;
  #password;
  #role;

  constructor(userId, username, email, password, role) {
    this.#userId = userId;
    this.#username = username;
    this.#email = email;
    this.#password = password;
    this.#role = role;
  }

  toJson() {
    return {
      userId: this.#userId,
      username: this.#username,
      email: this.#email,
      role: this.#role,
    };
  }

  static fromJson(json) {
    if (!json.userId) throw new Error('UserModel is being created without user ID');

    return new UserModel(
      json.userId,
      json.username,
      json.email,
      json.password || '',
      json.role,
    );
  }

  get userId() {
    return this.#userId;
  }

  get username() {
    return this.#username;
  }

  get email() {
    return this.#email;
  }

  get password() {
    return this.#password;
  }

  get role() {
    return this.#role;
  }

  get isAdmin() {
    return this.#role === 'admin';
  }
}
