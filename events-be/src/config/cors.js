const cors = require("cors");
const config = require("./dotenv");

const FRONTEND_URL = config.frontend.url;
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [FRONTEND_URL];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

module.exports = cors(corsOptions);
