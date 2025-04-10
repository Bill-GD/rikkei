const jobService = require("../services/job.services");

module.exports.getAll = async (req, res) => {
  console.log("Hello world");
  try {
    let result = await jobService.getAll();
    console.log("result", result);
    res.status(200).json({
      result,
      message: "GET ALL SUCCESSFULLY",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred on server",
      error,
    });
  }
};
module.exports.getOne = (req, res) => {
  res.json({
    message: "GET ONE SUCCESSFULLY",
  });
};
module.exports.createOne = (req, res) => {
  res.json({
    message: "POST ONE SUCCESSFULLY",
  });
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
