import { Request, Response, NextFunction } from 'express';
import { ValidationResult } from 'joi';
import { userSchema } from '../config/validation-schemas.js';

export async function validateBody(req: Request, res: Response, next: NextFunction) {
  const { name, email, password } = req.body;
  console.log(req.body);
  const result: ValidationResult = userSchema.validate({ name, email, password });
  
  if (result.error) res.status(400).json(result.error);
  next();
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {

}
