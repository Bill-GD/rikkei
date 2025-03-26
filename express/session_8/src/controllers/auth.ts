import { Request, Response } from 'express';
import AuthService from '../services/auth.js';

export default class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const newId = await AuthService.register(name, email, password);
      res.status(200).json({ message: 'Registered', id: newId });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }
}
