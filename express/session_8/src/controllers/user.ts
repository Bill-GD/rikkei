import { Request, Response } from 'express';
import UserService from '../services/user.js';

export default class UserController {
  static async updateAvatar(req: Request, res: Response) {
    try {
      const { avatar } = req.body, { userId } = req.body.user;
      await UserService.updatePassword(userId, avatar);
      res.status(200).json({ message: 'Updated avatar successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error: (error as Error).message });
    }
  }
}
