class OverviewController {
  static index(req, res) {
    res.send('<h1>This is overview page</h1>');
  }
}

module.exports = OverviewController;
