class HomeController {
  static index(req, res) {
    res.send('<h1>This is homepage</h1>');
  }
}

module.exports = HomeController;
