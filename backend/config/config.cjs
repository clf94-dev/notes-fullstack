require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const base = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  dialect: "postgres",
  logging: process.env.SEQ_LOG === "true" ? console.log : false,
};

module.exports = {
  development: { ...base },
  test: { ...base, database: process.env.DB_NAME || "notes_db_test" },
  production: { ...base, logging: false },
};
