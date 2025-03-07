import db from '../config/database.js';
import { BenefitService } from './benefit.service.js';
import { CategoryService } from './category.service.js';
import { CompanyService } from './company.service.js';
import { LocationService } from './location.service.js';
import { SkillService } from './skill.service.js';

export const JobService = {
  getAll: async (salaryRange, category, location, skills, sorting, paging) => {
    const query = db('job').select('job.*');

    if (salaryRange) query.where({ salary_min: salaryRange.min }).where({ salary_max: salaryRange.max });

    if (category) query
      .join('job_categories', 'job.job_id', 'job_categories.job_id')
      .join('category', 'category.category_id', 'job_categories.category_id')
      .where({ 'category.category_name': category });

    if (location) query
      .join('location', 'job.location_id', 'location.location_id')
      .where({ 'location.location_name': location });

    if (skills) query
      .join('job_skills', 'job.job_id', 'job_skills.job_id')
      .join('skill', 'skill.skill_id', 'job_skills.skill_id')
      .whereIn('skill.skill_name', skills);

    if (sorting) query.orderBy(`job.${sorting.sort}`, sorting.order);
    if (paging) query.limit(paging.limit).offset(paging.offset);

    const result = await query;

    for (const job of result) {
      job.skills = (await SkillService.getSkillsOf(job.job_id)).map(e => e.skill_name);
      job.categories = (await CategoryService.getCategoriesOf(job.job_id)).map(e => e.category_name);
      job.locations = (await LocationService.getLocation(job.location_id)).map(e => e.location_name);
      job.company = (await CompanyService.get(job.company_id));
      job.benefits = await BenefitService.getBenefitsOf(job.job_id);
      delete job.company_id;
      delete job.location_id;
    }

    return result;
  },
};
