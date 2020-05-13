import "./scss/index.scss";

import * as React from "react";

import { TextField } from "../../components";

import { useIntl } from "react-intl";

interface SearchPageProps {
  query: string;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  children,
  query,
  onQueryChange,
}) => {
  const intl = useIntl();

  return (
    <>
      <div className="search-page">
        <div className="search-page__header">
          <div className="search-page__header__input container">
            <TextField
              autoFocus
              label={
                intl.formatMessage({
                  defaultMessage: "Search term:",
               })
              }
              onChange={onQueryChange}
              value={query}
            />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};
export default SearchPage;
