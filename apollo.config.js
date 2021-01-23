module.exports = {
  client: {
    excludes: ["**/__tests__/**/*", "**/@sdk/**/*"],
    service: {
      name: "saleor",
      // url: "http://localhost:8000/graphql/",
      url: "https://master.staging.saleor.rocks/graphql/",
    },
  },
};
