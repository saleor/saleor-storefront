import queryString from "query-string";
import { useHistory } from "react-router-dom";

export const useSearchQueryAttributes = () => {
  const history = useHistory();
  const search = history.location.search;
  const searchQueryAttributes = queryString.parse(search);

  const updateUrlWithAttributes = (slug: string, value: string) => {
    history.replace(
      queryString.stringifyUrl(
        {
          query: { [slug]: value },
          url: `${history.location.pathname}${history.location.search}`,
        },
        { skipEmptyString: true }
      )
    );
  };

  const clearUrlAttribute = (slug: string) => updateUrlWithAttributes(slug, "");
  const clearUrl = () => history.replace(history.location.pathname);

  return {
    clearUrl,
    clearUrlAttribute,
    searchQueryAttributes,
    updateUrlWithAttributes,
  };
};
