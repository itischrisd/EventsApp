require("dotenv").config();

module.exports = {
  database: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql"
  },
  server: {
    port: process.env.PORT || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET || "default_secret"
  },
  frontend: {
    url: process.env.FRONTEND_URL || "http://localhost:5137"
  }
};
