import db from '../config/database.js';

export const LocationService = {
  // getLocationsOf: (jobId) => {
  //   return db('location')
  //     .select('location.*')
  //     .join('job_locations', 'job_locations.location_id', 'location.location_id')
  //     .where({ 'job_locations.job_id': jobId });
  // },
  get: (id) => {
    return db('location').where({ 'location_id': id });
  },
  getId: async (name) => {
    return (await db('location').where({ 'location_name': name }))[0].location_id;
  },
  hasLocation: async (name) => {
    const [result] = await db('location').count('* as count').where({ location_name: name });
    return result.count > 0;
  },
};
