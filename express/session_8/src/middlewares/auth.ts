import { Request, Response, NextFunction } from 'express';
import { ValidationResult } from 'joi';
import { userSchema } from '../config/validation-schemas.js';
import UserService from '../services/user.js';

export async function validateBody(req: Request, res: Response, next: NextFunction) {
  const { name, email, password } = req.body;
  
  const result: ValidationResult = userSchema.validate({ name, email, password });
  
  if (result.error) res.status(400).json(result.error);
  next();
}

export function shouldEmailExists(shouldUserExists: boolean) {
  return async function hasUserByEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const userExists = await UserService.hasUserByEmail(email);
    
    if ((userExists && shouldUserExists) || (!userExists && !shouldUserExists)) {
      next();
    } else {
      res.status(shouldUserExists ? 403 : 404).json({
        message: `User ${shouldUserExists
          ? 'doesn\'t exist'
          : 'already exists'}`,
      });
    }
  };
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {

}
