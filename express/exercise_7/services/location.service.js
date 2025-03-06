import db from '../config/database.js';

export const LocationService = {
  hasLocation: async (name) => {
    const [result] = await db('location').count('* as count').where({ location_name: name });
    return result.count > 0;
  },
};
