import { mediumScreen } from "../App/scss/variables.scss";
import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";
import Media from "react-media";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { Button, Loader, TextField } from "..";
import { generateProductUrl, maybe } from "../../core/utils";
import { searchUrl } from "../App/routes";
import CachedImage from "../CachedImage";
import Debounce from "../Debounce";
import { Error } from "../Error";
import NetworkStatus from "../NetworkStatus";
import { OfflinePlaceholder } from "../OfflinePlaceholder";
import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";
import { TypedSearchResults } from "./queries";
import { SearchResults } from "./types/SearchResults";

const closeSvg = require("../../images/x.svg");
const noPhotoPng = require("../../images/nophoto.png");
const searcgSvg = require("../../images/search.svg");

const canDisplay = (data: SearchResults) =>
  data && data.products && data.products.edges;

class SearchOverlay extends React.Component<{}, { search: string }> {
  constructor(props) {
    super(props);
    this.state = { search: "" };
  }

  render() {
    return (
      <OverlayContext.Consumer>
        {overlayContext => {
          if (overlayContext.type === OverlayType.search) {
            return (
              <Overlay
                context={overlayContext}
                className="overlay--no-background"
              >
                <div
                  className={classNames({
                    ["search"]: true,
                    ["search--has-results"]: this.state.search.length > 0
                  })}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="search__input">
                    <Debounce
                      debounce={event =>
                        this.setState({
                          search: event.target.value
                        })
                      }
                      value={this.state.search}
                      time={500}
                    >
                      {({ change, value: query }) => (
                        <Media query={{ maxWidth: mediumScreen }}>
                          {matches =>
                            matches ? (
                              <TextField
                                iconLeft={
                                  <ReactSVG
                                    path={closeSvg}
                                    onClick={overlayContext.hide}
                                  />
                                }
                                iconRight={<ReactSVG path={searcgSvg} />}
                                autoFocus={true}
                                onChange={change}
                                value={query}
                              />
                            ) : (
                              <TextField
                                iconRight={<ReactSVG path={searcgSvg} />}
                                autoFocus={true}
                                onChange={change}
                                value={query}
                              />
                            )
                          }
                        </Media>
                      )}
                    </Debounce>
                  </div>
                  <div
                    className={classNames({
                      ["search__products"]: true,
                      ["search__products--expanded"]:
                        this.state.search.length > 0
                    })}
                  >
                    <NetworkStatus>
                      {isOnline => (
                        <TypedSearchResults
                          renderOnError
                          displayError={false}
                          errorPolicy="all"
                          variables={{ query: this.state.search }}
                        >
                          {({ data, error, loading }) => {
                            if (canDisplay(data)) {
                              return (
                                <>
                                  <ul>
                                    {data.products.edges.map(item => (
                                      <li
                                        key={item.node.id}
                                        className="search__products__item"
                                      >
                                        <Link
                                          to={generateProductUrl(
                                            item.node.id,
                                            item.node.name
                                          )}
                                        >
                                          <CachedImage
                                            url={maybe(
                                              () => item.node.thumbnail.url,
                                              noPhotoPng
                                            )}
                                            url2x={maybe(
                                              () => item.node.thumbnail2x.url,
                                              noPhotoPng
                                            )}
                                          />
                                          <span>
                                            <h4>{item.node.name}</h4>
                                            <p>{item.node.category.name}</p>
                                          </span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                  <div className="search__products__footer">
                                    {loading ? (
                                      <Loader />
                                    ) : (
                                      <Link
                                        to={{
                                          pathname: searchUrl,
                                          search: `?q=${this.state.search}`
                                        }}
                                      >
                                        <Button>Show all results</Button>
                                      </Link>
                                    )}
                                  </div>
                                </>
                              );
                            }

                            if (error) {
                              if (!isOnline) {
                                return <OfflinePlaceholder />;
                              }
                              return <Error error={error.message} />;
                            }
                          }}
                        </TypedSearchResults>
                      )}
                    </NetworkStatus>
                  </div>
                </div>
              </Overlay>
            );
          } else if (this.state.search) {
            this.setState({ search: "" });
          }
        }}
      </OverlayContext.Consumer>
    );
  }
}

export default SearchOverlay;
