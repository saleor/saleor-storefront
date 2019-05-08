import { searchUrl } from "../../../components/App/routes";

export const structuredData = shop => {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: shop.description,
    name: shop.name,
    potentialAction: {
      "@type": "SearchAction",
      "query-input": "required name=q",
      target: searchUrl + "?q={q}"
    },
    url: location.href
  };
  return JSON.stringify(data);
};
