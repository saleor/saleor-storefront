const withPlugins = require("next-compose-plugins");
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require("next/constants");
const withOptimizedImages = require("next-optimized-images");

const withServiceWorkerConfig = require("./config/next/config.serviceWorker");
const withBaseConfig = require("./config/next/config.base");
const withDevConfig = require("./config/next/config.dev");
const withProdConfig = require("./config/next/config.prod");

module.exports = withPlugins([
  [withOptimizedImages, { handleImages: ["jpeg", "png", "webp", "gif"] }],
  withBaseConfig,
  withServiceWorkerConfig,
  [withDevConfig, {}, [PHASE_DEVELOPMENT_SERVER]],
  [withProdConfig, {}, [PHASE_PRODUCTION_SERVER, PHASE_PRODUCTION_BUILD]],
]);
