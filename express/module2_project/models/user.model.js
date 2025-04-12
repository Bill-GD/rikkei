export default class UserModel {
  userId;
  username;
  email;
  password;
  role;

  constructor(userId, username, email, password, role) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  toJson() {
    return {
      userId: this.userId,
      username: this.username,
      email: this.email,
      role: this.role,
    };
  }
}
