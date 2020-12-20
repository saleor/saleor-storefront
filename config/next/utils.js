const { copy } = require("fs-extra");
const { join } = require("path");

module.exports = {
  /**
   * Copies the generated Service Worker into the export folder if the Next.js app is being built as a Static HTML app
   */
  exportSw: (nextConfig, serviceWorkerDest, sericeWorkerFile) => {
    return async function exportPathMap(...args) {
      const [defaultPathMap, { outDir }] = args;

      if (process.env.NEXT_EXPORT) {
        await copy(serviceWorkerDest, join(outDir, sericeWorkerFile));
      }

      return nextConfig.exportPathMap
        ? nextConfig.exportPathMap(...args)
        : defaultPathMap;
    };
  },
};
