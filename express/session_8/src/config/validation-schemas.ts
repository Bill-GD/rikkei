import joi from 'joi';

export const userSchema = joi.object({
  name: joi.string().min(3),
  email: joi.string().email({
    maxDomainSegments: 2,
    tlds: {
      allow: ['com'],
    },
  }),
  password: joi.string().min(8),
});
