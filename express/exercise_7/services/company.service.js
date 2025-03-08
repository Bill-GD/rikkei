import db from '../config/database.js';

export const CompanyService = {
  get: (id) => {
    return db('company').where({ company_id: id });
  },
  getId: async (name) => {
    return (await db('company').where({ name }))[0].company_id;
  },
  hasCompany: async (name) => {
    const [result] = await db('company').count('* as count').where({ name });
    return result.count > 0;
  },
};
