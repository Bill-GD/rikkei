import knex from 'knex';
import knexConfig from './knex-config.js';

const db = knex(knexConfig.development);

export default db;
