import joi from 'joi';

export const userSchema = joi.object({
  username: joi.string().min(4),
  email: joi.string().email({
    tlds: {
      allow: ['com', 'net'],
    },
  }),
  password: joi.string().pattern(/^[a-zA-Z0-9]{5,30}$/),
});
