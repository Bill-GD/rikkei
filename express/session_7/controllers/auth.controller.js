import AuthService from '../services/auth.service.js';

export default class AuthController {
  static async register(req, res) {
    try {
      let { email, password, avatar } = req.body;
      const newUserId = await AuthService.register(email, password, avatar);
      res.json({ message: 'Registered successfully', newUserId });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async signin(req, res) {
    try {
      let { email, password } = req.body;
      const token = await AuthService.signIn(email, password);
      res.json({ message: 'Signed in successfully', token });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error: error.message });
    }
  }
}
