import UserModel from '../models/user.model.js';

export default class UserController {
  static getAll(req, res) {
    UserModel.getAll()
             .then(users => {
               res.status(200).json(users.map(e => e.toJson()));
             });
  }
}
