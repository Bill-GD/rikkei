import jwt from 'jsonwebtoken';

import { registerBody } from '../../config/validate-schema.js';

export function validateBody(req, res, next) {
  // email, pass
  let { email, password } = req.body;

  let { error } = registerBody.validate({ email, password });
  if (error) {
    res.json(error);
  } else {
    next();
  }
}
