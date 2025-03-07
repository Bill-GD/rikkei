import db from '../config/database.js';

export const CompanyService = {
  get: (id) => {
    return db('company').where({ company_id: id });
  },
};
