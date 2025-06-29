const validator = require("validator");

function isValidUrl(url) {
  return validator.isURL(url, {
    protocols: ["http", "https"],
    require_protocol: true,
  });
}

module.exports = {
  isValidUrl,
};
