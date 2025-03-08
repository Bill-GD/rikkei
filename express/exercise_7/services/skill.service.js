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
  /**
   * @returns {Promise<number>}
   */
  getNextId: async () => {
    return (await db('skill').max('skill_id as max'))[0].max + 1;
  },
  getId: async (name) => {
    return (await db('skill').where({ 'skill_name': name }))[0].skill_id;
  },
  add: async (name) => {
    const nextId = await SkillService.getNextId();
    await db('skill').insert({ skill_id: nextId, skill_name: name });
    return nextId;
  },
  addFor: async (jobId, name) => {
    const skillId = !(await SkillService.hasSkill(name))
      ? await SkillService.add(name)
      : await SkillService.getId(name);
    await db('job_skills').insert({ job_id: jobId, skill_id: skillId });
  },
  deleteFor: async (jobId) => {
    await db('job_skills').where({ job_id: jobId }).del();
  },
};
