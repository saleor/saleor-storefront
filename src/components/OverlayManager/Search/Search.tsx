import { NextRouter, withRouter } from "next/router";
import React, { useState } from "react";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps,
} from "react-intl";
import ReactSVG from "react-svg";

import { OfflinePlaceholder } from "@components/atoms";
import { paths } from "@paths";
import { grayMedium } from "@styles/constants";
import TextField from "@temp/components/TextField";
import { channelSlug } from "@temp/constants";
import { commonMessages } from "@temp/intl";

import { maybe } from "../../../core/utils";
import searchImg from "../../../images/search.svg";
import { Loader } from "../..";
import Button from "../../Button/index";
import { Error } from "../../Error";
import NetworkStatus from "../../NetworkStatus";
import { SearchResults } from "./gqlTypes/SearchResults";
import NothingFound from "./NothingFound";
import ProductItem from "./ProductItem";
import { TypedSearchResults } from "./queries";

import "./scss/index.scss";

interface SearchProps extends WrappedComponentProps {
  router: NextRouter;
}

function Search(props: SearchProps) {
  const [searchTerms, setSearchTerms] = useState("");
  const [hasSearchPhrase, setHasSearchPhrase] = useState(false);

  const submitBtnRef = React.createRef<HTMLButtonElement>();

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

  return (
    <>
      <div className="search__input">
        <TextField
          onChange={evt => {
            setSearchTerms(evt.target.value.toLowerCase());
            setHasSearchPhrase(false);
          }}
          onKeyPress={e => {
            if (e.key === "Enter") {
              setHasSearchPhrase(true);
              setShowResult(true);
            }
          }}
          placeholder={props.intl.formatMessage(commonMessages.search)}
        />
        <div className="search-button">
          <button
            className="btn-search"
            onClick={() => {
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
                  {({ data, error, loading }) => {
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
                          <div className="search__products__footer">
                            {loading ? (
                              <Loader />
                            ) : (
                              <Button
                                testingContext="searchProductsButton"
                                btnRef={submitBtnRef}
                                type="submit"
                                onClick={() => handleClickShowAll()}
                              >
                                <FormattedMessage defaultMessage="Show all results" />
                              </Button>
                            )}
                          </div>
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

                    return (
                      <NothingFound
                        search={searchTerms}
                        closeSearch={() => {
                          setHasSearchPhrase(false);
                        }}
                      />
                    );
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
