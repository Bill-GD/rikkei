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

export function shouldEmailExists(shouldExists) {
  return async function hasUserByEmail(req, res, next) {
    const { email } = req.body;
    const userExists = await UserModel.hasUserByEmail(email);

    if ((userExists && shouldExists) || (!userExists && !shouldExists)) {
      next();
    } else {
      res.status(shouldExists ? 403 : 404).json({
        message: `User ${shouldExists
          ? 'doesn\'t exist'
          : 'already exists'}`,
      });
    }
  };
}
