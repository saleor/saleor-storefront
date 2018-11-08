const urljoin = require("url-join");

const API_URL = urljoin(process.env.BACKEND_URL, "/graphql/");

module.exports = {
  client: {
    service: {
      name: "Saleor API",
      url: API_URL
    }
  }
};
