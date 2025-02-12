const { readFileSync, writeFileSync, existsSync } = require('node:fs');

class APIv1Controller {
  static dataPath = './dev-data/users.json';

  static index(req, res) {
    res.json({ message: 'This is API v1' });
  }

  static getAllUsers(req, res) {
    if (!existsSync(APIv1Controller.dataPath)) res.status(404).json({ message: 'Data not found' }); else res.status(200).json(JSON.parse(readFileSync(APIv1Controller.dataPath, 'utf8')));
  }

  static getUserById(req, res) {
    const reqId = req.params.id;

    if (!existsSync(APIv1Controller.dataPath)) {
      res.status(404).json({ message: 'Data not found' });
      return;
    }

    const users = JSON.parse(readFileSync(APIv1Controller.dataPath, 'utf8'));
    const reqUserIdx = users.findIndex(e => e._id === reqId);
    if (reqUserIdx < 0) res.status(404).json({ message: 'User not found' }); else res.status(200).json(users[reqUserIdx]);
  }

  static addNewUser(req, res) {
    const users = JSON.parse(readFileSync(APIv1Controller.dataPath, 'utf8'));
    const hasUser = users.findIndex(e => e.email === req.body.email) >= 0;

    if (hasUser) {
      res.status(403).json({ message: 'User already exists' });
      return;
    }

    const newUser = {
      _id: `${Math.random()}`.split('.')[1],
      ...req.body,
    };
    users.push(newUser);
    writeFileSync(APIv1Controller.dataPath, JSON.stringify(users), 'utf8');

    res.status(201).json({ message: 'User created successfully' });
  }

  static updateUserById(req, res) {
    const users = JSON.parse(readFileSync(APIv1Controller.dataPath, 'utf8'));
    const reqUserIdx = users.findIndex(e => e._id === req.params.id);

    if (reqUserIdx < 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    users[reqUserIdx] = {
      _id: users[reqUserIdx]._id,
      ...req.body,
    };
    writeFileSync(
      APIv1Controller.dataPath,
      JSON.stringify(users),
      'utf8',
    );

    res.status(201).json({ message: 'User updated successfully' });
  }

  static deleteUserById(req, res) {
    const users = JSON.parse(readFileSync(APIv1Controller.dataPath, 'utf8'));
    const reqUserId = users.findIndex(e => e._id === req.params.id);

    if (reqUserId < 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    users.splice(reqUserId, 1);
    writeFileSync(
      APIv1Controller.dataPath,
      JSON.stringify(users),
      'utf8',
    );

    res.status(200).json({ message: 'User deleted successfully' });
  }
}

module.exports = {
  APIv1Controller,
};
