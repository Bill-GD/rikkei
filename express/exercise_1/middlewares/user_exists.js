const { readFileSync } = require('node:fs');
const { APIv1Controller } = require('../controllers/api.js');

function userExists(req, res, next) {
  if (!req.params.id) {
    next(); // call next to continue the request to route callback(s)
    return;
  }

  const users = JSON.parse(readFileSync(APIv1Controller.dataPath, 'utf8'));
  const hasUser = users.findIndex(e => e._id === req.params.id) >= 0;
  
  if (hasUser) next();
  else res.status(404).json({ message: 'User not found' });
}

module.exports = userExists;
