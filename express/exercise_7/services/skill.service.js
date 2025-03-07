import db from '../config/database.js';

export const SkillService = {
  getSkillsOf: (jobId) => {
    return db('skill')
      .select('skill.*')
      .join('job_skills', 'job_skills.skill_id', 'skill.skill_id')
      .where({ 'job_skills.job_id': jobId });
  },
  hasSkill: async (name) => {
    const [result] = await db('skill').count('* as count').where({ skill_name: name });
    return result.count > 0;
  },
};
