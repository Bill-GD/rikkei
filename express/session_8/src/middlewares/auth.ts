import { Request, Response, NextFunction } from 'express';
import { ValidationResult } from 'joi';
import jwt from 'jsonwebtoken';
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
    console.log(req.file);
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
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: 'No authorization provided' });
    return;
  }
  
  const token = authorization!.split(' ')[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    // console.log(user);
    req.body.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred while verifying token', error: (error as Error).message });
  }
}

export async function getTokenFromCookie(req: Request, res: Response, next: NextFunction) {
  const cookies = req.headers.cookie;
  if (cookies) {
    const token = cookies.split(';').map(e => e.trim()).find(e => e.startsWith('token='))?.split('=')[1];
    if (token) {
      // console.log(token);
      req.headers.authorization = `Bearer ${token}`;
    }
  }
  next();
}
