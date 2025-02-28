const knexConfig = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: process.env.DATABASE_PASSWORD,
      database: 'express_exercise_5_knex',
    },
  },
};

export default knexConfig;
