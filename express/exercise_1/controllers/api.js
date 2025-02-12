class APIv1Controller {
  static index(req, res) {
    res.json({ message: 'This is API v1' });
  }
}

module.exports = {
  APIv1Controller,
};
