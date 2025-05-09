import Joi from 'joi';

export const userRegistrationSchema = Joi.object({
  email: Joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  password: Joi
    .string()
    .pattern(/^[a-zA-Z0-9]{8,30}$/),
});
