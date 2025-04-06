import knex from 'knex';
import config from './knex-file.js';

const db = knex(config.development);

export default db;
