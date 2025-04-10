const authService = require("../services/auth.services");
const e = require('express');

module.exports.register = async function (req, res) {
  let { email, password } = req.body;
  try {
    let [id] = await authService.register(email, password);
    res.status(201).json({
      created_user_id: id,
      message: "Register successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred on server",
      error: error.message,
    });
  }
};

module.exports.signIn = async function (req, res) {
  let { email, password } = req.body;
  try {
    let result = await authService.signIn(email, password);
    res.status(200).json({
      accessToken: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
