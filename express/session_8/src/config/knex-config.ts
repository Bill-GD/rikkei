const knexConfig = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: process.env.DATABASE_PASSWORD,
      database: 'programming_courses',
    },
  },
};

export default knexConfig;
