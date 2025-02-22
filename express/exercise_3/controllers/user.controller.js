import UserModel from '../models/user.model.js';

export default class UserController {
  static getAll(req, res) {
    console.log(req.query);

    if (req.query.page !== undefined && req.query.limit !== undefined) {
      return UserController.getByPage(
        req,
        res,
        parseInt(req.query.page),
        parseInt(req.query.limit),
      );
    }

    if (req.query.interests) {
      return UserController.getByInterest(req, res, req.query.interests);
    }

    UserModel.getAll()
             .then(users => {
               let resUsers = users.map(e => e.toJson());

               res.status(200).json(resUsers);
             });
  }

  static getByPage(req, res, page, limit) {
    UserModel.getAllByPage(page, limit)
             .then(
               users => {
                 res.status(200).json(users.map(e => e.toJson()));
               });
  }

  static getByInterest(req, res, interest) {
    UserModel.getAll()
             .then(users => {
               res.status(200).json(users.map(e => e.toJson()).filter(e => e.interests.includes(interest)));
             });
  }
}
