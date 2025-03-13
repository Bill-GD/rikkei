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
