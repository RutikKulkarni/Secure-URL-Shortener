const { pool } = require("../database/connection");
const { generateShortCode } = require("../utils/generators");

const urlService = {
  async createShortUrl(url) {
    // Check if URL already exists
    const existingUrl = await pool.query(
      "SELECT short_code FROM urls WHERE original_url = $1",
      [url]
    );

    if (existingUrl.rows.length > 0) {
      return {
        shortUrl: `${process.env.BASE_URL || "http://localhost:5000"}/${
          existingUrl.rows[0].short_code
        }`,
        shortCode: existingUrl.rows[0].short_code,
      };
    }

    // Generate unique short code
    let shortCode;
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 10) {
      shortCode = generateShortCode();
      const existing = await pool.query(
        "SELECT id FROM urls WHERE short_code = $1",
        [shortCode]
      );
      isUnique = existing.rows.length === 0;
      attempts++;
    }

    if (!isUnique) {
      throw new Error("Unable to generate unique short code");
    }

    // Insert new URL
    await pool.query(
      "INSERT INTO urls (original_url, short_code) VALUES ($1, $2)",
      [url, shortCode]
    );

    return {
      shortUrl: `${
        process.env.BASE_URL || "http://localhost:5000"
      }/${shortCode}`,
      shortCode: shortCode,
    };
  },

  async getOriginalUrl(shortCode) {
    const result = await pool.query(
      "SELECT original_url FROM urls WHERE short_code = $1",
      [shortCode]
    );

    return result.rows.length > 0 ? result.rows[0].original_url : null;
  },

  async incrementClicks(shortCode) {
    await pool.query(
      "UPDATE urls SET clicks = clicks + 1 WHERE short_code = $1",
      [shortCode]
    );
  },

  async getUrlAnalytics(shortCode) {
    const result = await pool.query(
      "SELECT original_url, short_code, created_at, clicks FROM urls WHERE short_code = $1",
      [shortCode]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const urlData = result.rows[0];
    return {
      originalUrl: urlData.original_url,
      shortCode: urlData.short_code,
      createdAt: urlData.created_at,
      totalClicks: urlData.clicks,
    };
  },

  async getAllUrls() {
    const result = await pool.query(
      "SELECT original_url, short_code, created_at, clicks FROM urls ORDER BY created_at DESC LIMIT 100"
    );

    return result.rows.map((row) => ({
      originalUrl: row.original_url,
      shortCode: row.short_code,
      shortUrl: `${process.env.BASE_URL || "http://localhost:5000"}/${
        row.short_code
      }`,
      createdAt: row.created_at,
      clicks: row.clicks,
    }));
  },
};

module.exports = urlService;
