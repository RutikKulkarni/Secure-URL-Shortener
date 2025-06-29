const urlService = require("../services/url.service");
const { isValidUrl } = require("../utils/validators");

const urlController = {
  async shortenUrl(req, res) {
    try {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      if (!isValidUrl(url)) {
        return res.status(400).json({ error: "Invalid URL format" });
      }

      const result = await urlService.createShortUrl(url);
      res.json(result);
    } catch (error) {
      console.error("Shorten URL error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async redirectUrl(req, res) {
    try {
      const { code } = req.params;

      if (!code || code.length !== 8) {
        return res.status(404).json({ error: "Invalid short code" });
      }

      const originalUrl = await urlService.getOriginalUrl(code);

      if (!originalUrl) {
        return res.status(404).json({ error: "Short URL not found" });
      }

      await urlService.incrementClicks(code);
      res.redirect(originalUrl);
    } catch (error) {
      console.error("Redirect error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getAnalytics(req, res) {
    try {
      const { code } = req.params;
      const analytics = await urlService.getUrlAnalytics(code);

      if (!analytics) {
        return res.status(404).json({ error: "Short URL not found" });
      }

      res.json(analytics);
    } catch (error) {
      console.error("Analytics error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getAllUrls(req, res) {
    try {
      const urls = await urlService.getAllUrls();
      res.json(urls);
    } catch (error) {
      console.error("Get URLs error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = urlController;
