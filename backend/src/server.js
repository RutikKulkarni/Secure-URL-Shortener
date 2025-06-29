const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { rateLimiter } = require("./middleware/ratelimiter");
const urlRoutes = require("./routes/url.routes");
const { initDatabase, pool } = require("./database/connection");

const app = express();
const PORT = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());

app.use("/shorten", rateLimiter);
app.use("/", urlRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initDatabase();
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  pool.end(() => {
    console.log("Database pool closed");
    process.exit(0);
  });
});

module.exports = app;
