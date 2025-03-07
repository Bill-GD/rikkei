import db from '../config/database.js';

export const BenefitService = {
  getBenefitsOf: (jobId) => {
    return db('benefit')
      .select('benefit.benefit_name as name', 'benefit.value')
      .join('job_benefits', 'job_benefits.benefit_id', 'benefit.benefit_id')
      .where({ 'job_benefits.job_id': jobId });
  },
};
