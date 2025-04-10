const userService = require("../services/user.services");

module.exports.getAll = (req, res) => {
  res.json({
    message: "GET ALL SUCCESSFULLY",
  });
};
module.exports.getOne = async (req, res) => {
  let { id } = req.params;
  let result = await userService.getOne(id);
  res.json(result);
};
module.exports.createOne = async (req, res) => {
  let { email, password } = req.body;
  let { fileName } = req;
  try {
    let result = await userService.createOne(email, password, fileName);
    console.log(result);
    res.json({
      create_user_id: result[0],
      message: "POST ONE SUCCESSFULLY",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      message: "Error occurred on server",
    });
  }
};

module.exports.updateOne = (req, res) => {
  res.json({
    message: "UPDATE ONE SUCCESSFULLY",
  });
};
module.exports.deleteOne = (req, res) => {
  res.json({
    message: "DELETE ONE SUCCESSFULLY",
  });
};
