module.exports = {
  client: {
    excludes: ["**/__tests__/**/*", "**/@sdk/**/*"],
    service: {
      name: "STORITALIA",
      url: "http://localhost:8000/graphql/",
    },
  },
};
