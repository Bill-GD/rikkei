class ProductController {
  static index(req, res) {
    res.send('<h1>This is product page</h1>');
  }
}

module.exports = ProductController;
