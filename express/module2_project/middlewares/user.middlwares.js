import UserService from '../service/user.service.js';

export function shouldEmailExists(shouldExists) {
  return async function (req, res, next) {
    const { email } = req.body;
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
