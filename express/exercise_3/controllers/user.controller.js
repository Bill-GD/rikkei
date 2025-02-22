import { UserModel } from '../models/index.js';

export default class UserController {
  static getAll(req, res) {
    if (req.query.interests) {
      UserModel.getAll().then(users => {
        res.json(users.map(e => e.toJson()).filter(e => {
          for (const interest of req.query.interests) {
            if (e.interests.includes(interest)) return true;
          }
          return false;
        }));
      });
      return;
    }

    if (req.getPage) {
      UserModel.getAllByPage(req.pageQuery.page, req.pageQuery.limit).then(users => {
        res.json(users.map(e => e.toJson()));
      });
      return;
    }

    if (req.getSorted) {
      UserModel.getSorted(req.sortQuery.sort, req.sortQuery.order).then(users => {
        res.json(users.map(e => e.toJson()));
      });
      return;
    }

    UserModel.getAll().then(users => {
      res.json(users.map(e => e.toJson()));
    });
  }

  static getById(req, res) {
    UserModel.get(req.params.id).then(user => {
      res.json(user.toJson());
    });
  }

  static addUser(req, res) {

  }
}
