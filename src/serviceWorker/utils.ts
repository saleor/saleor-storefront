declare const self: ServiceWorkerGlobalScope;

export const getBuildManifest = (): NextBuildManifest => {
  const manifest = self.__BUILD_MANIFEST;

  return Object.entries(manifest)
    .filter(([path]) => path.startsWith("/"))
    .reduce<NextBuildManifest>(
      (manifest, [page, assets]) => ({
        ...manifest,
        [page]: assets.map(url => `/_next/${url}`),
      }),
      {}
    );
};

export const getBuildManifestPages = (): string[] => {
  const { sortedPages, __rewrites, ...manifest } = getBuildManifest();

  return Object.keys(manifest).filter(
    url => !url.includes("/_") && url !== "/404"
  );
};

export const getRequestedPageFromURL = (url: string): string | undefined => {
  const { pathname } = new URL(url);
  const manifest = getBuildManifestPages();

  /*
   * If URL is not dynamic.
   */
  if (manifest.indexOf(pathname) > -1) {
    return pathname;
  }

  /*
   * The URL might be dynamic,
   * try to find page by going through
   * manifest page paths.
   */
  const requestedPage = pathname.split("/");

  return manifest.find(page => {
    const manifestPage = page.split("/");

    if (manifestPage.length !== requestedPage.length) {
      return false;
    }

    return manifestPage.every((manifestPathPiece, index) => {
      const requestedPathPiece = requestedPage[index];

      return (
        manifestPathPiece === requestedPathPiece ||
        /^\[\w+\]$/.test(manifestPathPiece)
      );
    });
  });
};

export const deleteEntriesForCache = (CACHE_NAME: string) => async (): Promise<
  void
> => {
  const cache = await self.caches.open(CACHE_NAME);
  const cachedRequests = await cache.keys();

  // eslint-disable-next-line no-restricted-syntax
  for (const entry of cachedRequests) {
    await cache.delete(entry);
  }
};
