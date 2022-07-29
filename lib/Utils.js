const crypto = require("crypto");
const createHash = (info) => {
  return crypto.createHash("sha3-512").update(info).digest("hex");
};

module.exports = { createHash };
