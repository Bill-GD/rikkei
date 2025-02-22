import { AddressModel, CompanyModel, UserModel } from '../models/index.js';

export class UserController {
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

  static async addUser(req, res) {
    const data = { ...req.body };
    // const fields = ['name', 'username', 'email', 'zipcode', 'phone', 'website', 'companyName', 'interests'],
    const addressId = (await AddressModel.getByZip(data.zipcode)).id,
      companyId = (await CompanyModel.getByName(data.companyName)).id;

    const userData = {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      website: data.website,
      companyId: companyId,
      addressId: addressId,
      interests: data.interests.join('|'),
    };

    const newUserId = await UserModel.add(userData);
    res.status(201).json({ message: 'User created successfully', id: newUserId });
  }
}
