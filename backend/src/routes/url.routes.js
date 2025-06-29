const express = require("express");
const router = express.Router();
const urlController = require("../controllers/url.controller");

router.post("/shorten", urlController.shortenUrl);
router.get("/:code", urlController.redirectUrl);
router.get("/analytics/:code", urlController.getAnalytics);
router.get("/api/urls", urlController.getAllUrls);

module.exports = router;
