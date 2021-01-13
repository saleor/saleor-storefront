import urljoin from "url-join";

import { paths } from "@paths";

export const structuredData = shop => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: shop ? shop.description : "",
    name: shop ? shop.name : "",
    potentialAction: {
      "@type": "SearchAction",
      "query-input": "required name=q",
      target: urljoin(location.href, paths.search, "?q={q}"),
    },
    url: location.href,
  });
};
