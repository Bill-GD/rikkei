export default {
  development: {
    client: "mysql2",
    connection: {
      host: "localhost",
      database: "micro_auth_db",
      user: "root",
      password: process.env.DATABASE_PASSWORD,
    },
  },
};
