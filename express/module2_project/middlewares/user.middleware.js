import UserService from '../service/user.service.js';
import { requestError } from '../utils/responses.js';

export function shouldEmailExists(shouldExists) {
  return async function (req, res, next) {
    const email = req.body?.email;

    if (email === undefined) {
      requestError(res, 'Email not provided');
      return;
    }

    const userExists = await UserService.hasUser({ email });

    if ((userExists && shouldExists) || (!userExists && !shouldExists)) {
      next();
    } else {
      res.status(shouldExists ? 404 : 403).json({
        message: `User ${shouldExists
          ? 'doesn\'t exist'
          : 'already exists'}`,
      });
    }
  };
}

export function shouldUserIdExists(shouldExists) {
  return async function (req, res, next) {
    const { id } = req.params;
    const userExists = await UserService.hasUser({ id });

    if ((userExists && shouldExists) || (!userExists && !shouldExists)) {
      next();
    } else {
      res.status(shouldExists ? 404 : 403).json({
        message: `User ${shouldExists
          ? 'doesn\'t exist'
          : 'already exists'}`,
      });
    }
  };
}

export async function checkUpdateUserPermission(req, res, next) {
  const idToUpdate = +req.params.id, currentUser = req.authenticatedUser;

  if (!currentUser.isAdmin && currentUser.userId === idToUpdate) {
    next();
    return;
  }

  res.status(403)
     .json({
       message: currentUser.isAdmin
         ? `Admin's username can't be modified`
         : 'User is not authorized to perform this action.',
     });
}

export async function checkDeleteUserPermission(req, res, next) {
  const idToDelete = +req.params.id, currentUser = req.authenticatedUser;

  if ((currentUser.isAdmin || currentUser.userId === idToDelete) && idToDelete !== 0) {
    next();
    return;
  }

  res.status(403).json({ message: 'User is not authorized to perform this action.' });
}
