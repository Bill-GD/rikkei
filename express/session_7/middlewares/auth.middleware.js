import jwt from 'jsonwebtoken';
import { userRegistrationSchema } from '../config/validate-schema.js';

export async function validateBody(req, res, next) {
  // email needs a valid host name
  // password must be at least 8 chars, has digit...
  let { email, password } = req.body;
  // const acceptableHosts = ['gmail.com'];
  // const errorMessages = [];

  // if (!email.match(/^[a-zA-Z0-9_.\-]+@[a-zA-Z._\-]+\.[a-z]{2,}$/)) {
  // if (!/^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/.test(email)) {
  //   return res.status(400).json({ message: 'Email format is invalid' });
  // }
  //
  // if (!acceptableHosts.includes(email.split('@')[1])) {
  //   return res.status(400).json({ message: 'Email doesn\'t have an acceptable host' });
  // }
  //
  // if (password.length < 8) {
  //   return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  // }

  const { error } = userRegistrationSchema.validate({ email, password });
  if (error) return res.status(400).json(error);
  next();
}

export async function authenticate(req, res, next) {
  const { authorization } = req.headers;
  // const bearer = req.headers.cookie.split(';').map(e => e.trim()).filter(e => e.startsWith('Bearer'));

  if (!authorization) {
    return res.status(401).json({ message: 'No authorization token provided' });
  }
  const token = authorization.split(' ')[1];
  // console.log(token);
  try {
    req.authenticatedUser = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(req.authenticatedUser);
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Got error verifying authorization', error });
  }
}

export function authorize(allowedRoles = []) {
  return async (req, res, next) => {
    const { role } = req.authenticatedUser;
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'You don\'t have permission to access this content' });
    }
    next();
  };
}
