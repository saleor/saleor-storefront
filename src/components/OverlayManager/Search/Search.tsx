import { NextRouter, withRouter } from "next/router";
import React, { useState } from "react";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps,
} from "react-intl";
import ReactSVG from "react-svg";

import { OfflinePlaceholder } from "@components/atoms";
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

  return (
    <>
      <div className="search__input">
        <TextField
          onChange={evt => {
            setHasSearchPhrase(false);
            setSearchTerms(evt.target.value);
          }}
          placeholder={props.intl.formatMessage(commonMessages.search)}
        />
        <div>
          <button
            className="btn-search"
            onClick={() => searchTerms?.length && setHasSearchPhrase(true)}
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
                        <>
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
                              >
                                <FormattedMessage defaultMessage="Show all results" />
                              </Button>
                            )}
                          </div>
                        </>
                      );
                    }

                    if (error) {
                      return isOnline ? (
                        <Error error={error.message} />
                      ) : (
                        <OfflinePlaceholder />
                      );
                    }

                    return <NothingFound search={searchTerms} />;
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
