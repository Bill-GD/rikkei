import { AddressModel, AlbumModel, CompanyModel, UserModel } from '../models/index.js';

export class UserController {
  static getAll(req, res) {
    // TODO: maybe try merging the queries
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
    const data = { ...req.body },
      addressId = (await AddressModel.getByZip(data.zipcode)).id,
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

  static async updateUser(req, res) {
    const user = await UserModel.get(req.params.id),
      data = { ...req.body };

    const userData = {
      name: data.name || user.name,
      username: data.username || user.username,
      email: data.email || user.email,
      phone: data.phone || user.phone,
      website: data.website || user.website,
      // companyId: companyId || user.company.id,
      // addressId: addressId || user.address.id,
      interests: data.interests ? data.interests.join('|') : user.interests.join('|'),
    };

    await UserModel.update(req.params.id, userData);
    res.json({ message: 'User updated successfully' });
  }

  static deleteUser(req, res) {
    UserModel.delete(req.params.id).then(() => {
      res.json({ message: 'User deleted successfully' });
    });
  }

  static getAllAlbums(req, res) {
    const userId = req.params.id;

    if (req.getSorted) {
      AlbumModel.getSorted(userId, req.sortQuery.sort, req.sortQuery.order).then(albums => {
        res.json(albums.map(e => e.toJson()));
      });
    } else {
      AlbumModel.getAll(userId).then(albums => {
        const jsonList = albums.map(e => e.toJson());

        if (req.getPage) {
          const startIdx = (req.pageQuery.page - 1) * req.pageQuery.limit,
            endIdx = startIdx + req.pageQuery.limit;
          return res.json(jsonList.slice(startIdx, endIdx));
        }

        res.json(jsonList);
      });
    }
  }
}
