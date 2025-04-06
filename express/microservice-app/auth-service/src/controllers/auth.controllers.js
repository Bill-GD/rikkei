import axios from 'axios';
import AuthService from '../services/auth.services.js';

export default class AuthController {
  static async register(req, res) {
    let { email, password } = req.body;
    try {
      let { id, hash } = await AuthService.register(email, password);

      // register successfully
      // sync with user-service's database here
      // call user-service api to add user

      const { data } = await axios({
        method: 'post',
        url: 'http://localhost:3002/users',
        data: { id, email, password: hash },
      });
      console.log(data);

      res.json({
        created_user_id: id,
        message: 'Register successfully',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error occurred on server',
        error: error.message,
      });
    }
  }

  static async signIn(req, res) {
    let { email, password } = req.body;
    try {
      let result = await AuthService.signIn(email, password);
      res.json({
        accessToken: result,
      });
    } catch (error) {
      res.json(error);
    }
  }
}
