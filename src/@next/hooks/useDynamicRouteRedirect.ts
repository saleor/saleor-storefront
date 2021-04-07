import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { matchPath } from "react-router";

import { DYNAMIC_REDIRECT_PATHS, paths } from "@paths";
import { exportMode } from "@temp/constants";

/**
 * `DYNAMIC_REDIRECT_PATHS` are path which won't be generated at build time, thus with normal SPA
 * setup, after refresh user will be redirected to `index.html`. Match such redirect and redirect
 * user to proper path via client routing.
 */
export const useDynamicRouteRedirect = () => {
  const { asPath, pathname, replace } = useRouter();
  const shouldRedirect = useMemo(
    () =>
      exportMode &&
      pathname === paths.home &&
      DYNAMIC_REDIRECT_PATHS.some(path => matchPath(asPath, { path })),
    [asPath, pathname]
  );

  useEffect(() => {
    if (shouldRedirect) {
      replace(asPath);
    }
  }, []);

  return shouldRedirect;
};
