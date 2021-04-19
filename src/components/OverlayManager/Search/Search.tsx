import { NextRouter, withRouter } from "next/router";
import React, { useState } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import ReactSVG from "react-svg";

import { OfflinePlaceholder } from "@components/atoms";
import { paths } from "@paths";
import { grayMedium } from "@styles/constants";
import { DebounceChange } from "@temp/components/Debounce";
import TextField from "@temp/components/TextField";
import { channelSlug } from "@temp/constants";
import { commonMessages } from "@temp/intl";

import { maybe } from "../../../core/utils";
import searchImg from "../../../images/search.svg";
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
  const [searchTerms, setSearchTerms] = useState("");
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
    props.router.push(`${paths.search}?q=${searchTerms}`);
  };

  React.useEffect(() => {
    if (searchTerms.length > 0) {
      setShowResult(true);
      setHasSearchPhrase(true);
    }
  }, [searchTerms]);

  return (
    <>
      <div className="search__input">
        <DebounceChange
          debounce={evt =>
            setSearchTerms((evt.target.value as string).toLowerCase())
          }
          value={searchTerms}
          time={500}
        >
          {({ change, value }) => {
            return (
              <TextField
                autoFocus
                onChange={change}
                placeholder={props.intl.formatMessage(commonMessages.search)}
                value={value}
              />
            );
          }}
        </DebounceChange>

        <div className="search-button">
          <button
            className="btn-search"
            onClick={() => {
              handleClickShowAll();
              if (searchTerms?.length) {
                setHasSearchPhrase(true);
                setShowResult(true);
              }
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
                          ref={wrapperRef}
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
    </>
  );
}

export default injectIntl(withRouter(Search));
