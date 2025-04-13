import jwt from 'jsonwebtoken';
import { userSchema } from '../config/validate-schema.js';
import UserModel from '../models/user.model.js';
import { requestError } from '../utils/responses.js';

export async function validateBody(req, res, next) {
  const result = userSchema.validate(req.body);
  if (result.error) {
    return requestError(res, result.error);
  }
  next();
}

export async function getTokenFromCookie(req, res, next) {
  const cookies = req.headers.cookie;
  const token = cookies.split(';').map(e => e.trim()).find(e => e.startsWith('token='))?.split('=')[1];
  if (token) req.headers.authorization = `Bearer ${token}`;
  next();
}

export async function authenticate(req, res, next) {
  const { authorization } = req.headers; // 'Bearer {token}'
  if (!authorization) {
    res.status(401).json({ message: 'No authorization token provided' });
    return;
  }

  const token = authorization.split(' ')[1];
  req.authenticatedUser = UserModel.fromJson(jwt.verify(token, process.env.JWT_SECRET));
  next();
}

export function authorize(roles) {
  return async function (req, res, next) {
    const { authenticatedUser } = req;
    if (!roles.includes(authenticatedUser.role)) {
      res.status(403).json({ message: 'User is not authorized to view this content' });
      return;
    }
    next();
  };
}
