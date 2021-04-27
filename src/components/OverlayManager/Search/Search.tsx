import { NextRouter, withRouter } from "next/router";
import React, { useState } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import ReactSVG from "react-svg";

import { OfflinePlaceholder } from "@components/atoms";
import { paths } from "@paths";
import { grayMedium } from "@styles/constants";
import { DebouncedTextField } from "@temp/components/Debounce";
import { channelSlug } from "@temp/constants";
import { commonMessages } from "@temp/intl";

import { maybe } from "../../../core/utils";
import searchImg from "../../../images/search.svg";
import closeImg from "../../../images/x.svg";
import { Error } from "../../Error";
import NetworkStatus from "../../NetworkStatus";
import { SearchResults } from "./gqlTypes/SearchResults";
import ProductItem from "./ProductItem";
import { TypedSearchResults } from "./queries";

import "./scss/index.scss";

interface SearchProps extends WrappedComponentProps {
  router: NextRouter;
}

function Search(props: SearchProps) {
  const [searchTerms, setSearchTerms] = useState(props.router.query.q || "");

  const [hasSearchPhrase, setHasSearchPhrase] = useState(false);

  const hasResults = (data: SearchResults) =>
    maybe(() => !!data.products.edges.length);

  const [showResult, setShowResult] = React.useState(false);

  const useOutsideAlerter = ref => {
    React.useEffect(() => {
      const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowResult(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef);

  const handleClickShowAll = () => {
    if (searchTerms.length > 0) {
      props.router.push(`${paths.search}?q=${searchTerms}`);
    }
  };

  React.useEffect(() => {
    if (searchTerms.length > 0 && props.router.pathname !== "/search") {
      setShowResult(true);
      setHasSearchPhrase(true);
    }
  }, [searchTerms]);

  const [reset, setReset] = React.useState(false);

  React.useEffect(() => {
    if (searchTerms.length === 0) {
      setReset(false);
    }
  }, [searchTerms]);

  return (
    <div ref={wrapperRef}>
      <div className="search__input">
        <DebouncedTextField
          onChange={e => {
            setSearchTerms(e.target.value);
          }}
          value={searchTerms}
          resetValue={reset}
          iconRight={
            searchTerms &&
            searchTerms.length > 0 && (
              <ReactSVG
                path={closeImg}
                onClick={() => {
                  setReset(true);
                  setSearchTerms("");
                }}
                className="search__input__close-btn"
              />
            )
          }
          placeholder={props.intl.formatMessage(commonMessages.search)}
        />

        <div className="search-button">
          <button
            className="btn-search"
            onClick={() => {
              handleClickShowAll();
              setShowResult(false);
            }}
          >
            <ReactSVG path={searchImg} />
            <span className="btn-search--title">Search</span>
          </button>
        </div>
      </div>
      <div>
        <NetworkStatus>
          {isOnline => {
            if (hasSearchPhrase) {
              return (
                <TypedSearchResults
                  renderOnError
                  displayError={false}
                  errorPolicy="all"
                  variables={{
                    channel: channelSlug,
                    query: searchTerms,
                  }}
                >
                  {({ data, error }) => {
                    if (hasResults(data)) {
                      return (
                        <div
                          style={{
                            position: "absolute",
                            width: "100%",
                            background: grayMedium,
                            borderRadius: 4,
                            zIndex: 9999,
                            display: showResult ? "block" : "none",
                          }}
                        >
                          <ul>
                            {data.products.edges.map(product => (
                              <ProductItem {...product} key={product.node.id} />
                            ))}
                          </ul>
                        </div>
                      );
                    }

                    if (error) {
                      return isOnline ? (
                        <Error error={error.message} />
                      ) : (
                        <OfflinePlaceholder />
                      );
                    }

                    return null;
                    // <NothingFound
                    //   search={searchTerms}
                    //   closeSearch={() => {
                    //     setHasSearchPhrase(false);
                    //   }}
                    // />
                  }}
                </TypedSearchResults>
              );
            }
            return null;
          }}
        </NetworkStatus>
      </div>
    </div>
  );
}

export default injectIntl(withRouter(Search));
