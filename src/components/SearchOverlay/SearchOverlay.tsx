import { mediumScreen } from "../App/scss/variables.scss";
import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";
import Media from "react-media";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import ReactSVG from "react-svg";

import { Button, Loader, TextField } from "..";
import { maybe } from "../../core/utils";
import { searchUrl } from "../App/routes";
import Debounce from "../Debounce";
import { Error } from "../Error";
import NetworkStatus from "../NetworkStatus";
import { OfflinePlaceholder } from "../OfflinePlaceholder";
import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";
import NothingFound from "./NothingFound";
import ProductItem from "./ProductItem";
import { TypedSearchResults } from "./queries";
import { SearchResults } from "./types/SearchResults";

const closeSvg = require("../../images/x.svg");
const searcgSvg = require("../../images/search.svg");

type SearchOverlayProps = RouteComponentProps;

interface SearchOverlayState {
  search: string;
  inputFocused: boolean;
}

class SearchOverlay extends React.Component<
  SearchOverlayProps,
  SearchOverlayState
> {
  static contextType = OverlayContext;
  context!: React.ContextType<typeof OverlayContext>;
  state = { search: "", inputFocused: false };
  allResultsLinkRef = React.createRef<Link>();

  get hasSearchPhrase() {
    return this.state.search.length > 0;
  }

  get redirectTo() {
    return { pathname: searchUrl, search: `?q=${this.state.search}` };
  }

  hasResults = (data: SearchResults) =>
    maybe(() => !!data.products.edges.length);

  handleEnterPress = ({ charCode }: React.KeyboardEvent<HTMLInputElement>) => {
    const enterCharCode = 13;

    if (
      this.hasSearchPhrase &&
      charCode === enterCharCode &&
      this.allResultsLinkRef.current
    ) {
      this.props.history.push(`${searchUrl}?q=${this.state.search}`);
      this.context.hide();
    }
  };

  handleInputBlur = () => {
    if (!this.hasSearchPhrase) {
      this.context.hide();
    }
  };

  componentDidUpdate(
    prevProps: SearchOverlayProps,
    prevState: SearchOverlayState
  ) {
    if (!!prevState.search.length && this.context.type !== OverlayType.search) {
      this.setState({ search: "" });
    }
  }

  render() {
    if (this.context.type === OverlayType.search) {
      return (
        <Overlay context={this.context} className="overlay--no-background">
          <div
            className={classNames({
              ["search"]: true,
              ["search--has-results"]: this.hasSearchPhrase
            })}
            onClick={e => e.stopPropagation()}
          >
            <div className="search__input">
              <Debounce
                debounce={evt => this.setState({ search: evt.target.value })}
                value={this.state.search}
                time={500}
              >
                {({ change, value: query }) => (
                  <Media query={{ maxWidth: mediumScreen }}>
                    {matches => (
                      <TextField
                        iconLeft={
                          matches ? (
                            <ReactSVG
                              path={closeSvg}
                              onClick={this.context.hide}
                            />
                          ) : (
                            undefined
                          )
                        }
                        iconRight={<ReactSVG path={searcgSvg} />}
                        autoFocus={true}
                        onChange={change}
                        value={query}
                        placeholder="Search"
                        onKeyPress={this.handleEnterPress}
                        onBlur={this.handleInputBlur}
                      />
                    )}
                  </Media>
                )}
              </Debounce>
            </div>
            <div
              className={classNames({
                ["search__products"]: true,
                ["search__products--expanded"]: this.hasSearchPhrase
              })}
            >
              <NetworkStatus>
                {isOnline => {
                  if (this.hasSearchPhrase) {
                    return (
                      <TypedSearchResults
                        renderOnError
                        displayError={false}
                        errorPolicy="all"
                        variables={{ query: this.state.search }}
                      >
                        {({ data, error, loading }) => {
                          if (this.hasResults(data)) {
                            return (
                              <>
                                <ul>
                                  {data.products.edges.map(product => (
                                    <ProductItem
                                      {...product}
                                      key={product.node.id}
                                    />
                                  ))}
                                </ul>
                                <div className="search__products__footer">
                                  {loading ? (
                                    <Loader />
                                  ) : (
                                    <Link
                                      to={this.redirectTo}
                                      ref={this.allResultsLinkRef}
                                    >
                                      <Button>Show all results</Button>
                                    </Link>
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

                          return <NothingFound search={this.state.search} />;
                        }}
                      </TypedSearchResults>
                    );
                  }
                  return null;
                }}
              </NetworkStatus>
            </div>
          </div>
        </Overlay>
      );
    }
    return null;
  }
}

// Workaround ATM for:
// withRouter(SearchOverlay): Function components do not support contextType
export default withRouter(props => <SearchOverlay {...props} />);
