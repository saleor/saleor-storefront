const dotenv = require("dotenv");

const config = {
  ...dotenv.config().parsed,
  ...dotenv.config({ path: ".env.local" }).parsed,
};

module.exports = {
  client: {
    excludes: ["**/__tests__/**/*", "**/@sdk/**/*"],
    service: {
      url: config.NEXT_PUBLIC_API_URI,
    },
  },
};
