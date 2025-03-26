import { Request, Response } from 'express';
import AuthService from '../services/auth.js';

export default class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password, avatar } = req.body;
      const newId = await AuthService.register(name, email, password, avatar);
      res.status(201).json({ message: 'Registered', id: newId });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error: (error as Error).message });
    }
  }
  
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token: string = await AuthService.login(email, password);
      res.cookie('token', token);
      // console.log(document.cookie);
      res.status(200).json({ message: 'Signed in successfully', token });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error: (error as Error).message });
    }
  }
}
