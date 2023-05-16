const { database } = require("./index");

const connection = {
  username: database.username,
  password: database.password,
  database: database.database,
  dialect: "mysql",
  timezone: "+03:00",
  dialectOptions: {
    charset: "utf8mb4",
  },
  logging: false,
  host: database.host,
  port: database.port,
};

module.exports = {
  development: connection,
  test: connection,
  production: connection,
};
