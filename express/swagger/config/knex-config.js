module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "localhost",
      database: "authen_db",
      user: "root",
      password: process.env.DATABASE_PASSWORD,
    },
  },
};
