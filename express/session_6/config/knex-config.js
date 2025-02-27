const knexConfig = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: process.env.DATABASE_PASSWORD,
      database: 'construction_management',
    },
  },
};

export default knexConfig;
