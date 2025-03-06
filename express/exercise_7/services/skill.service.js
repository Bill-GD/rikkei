import db from '../config/database.js';

export const SkillService = {
  hasSkill: async (name) => {
    const [result] = await db('skill').count('* as count').where({ skill_name: name });
    return result.count > 0;
  }
};
