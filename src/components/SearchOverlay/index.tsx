import * as React from "react";
import { Query } from "react-apollo";
import Media from "react-media";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { Button, Loader, TextField } from "..";
import { SearchResults } from "../../core/types/saleor";
import { generateProductUrl } from "../../core/utils";
import { searchUrl } from "../App/routes";
import NetworkStatus from "../NetworkStatus";
import { OfflinePlaceholder } from "../OfflinePlaceholder";
import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";
import { GET_SEARCH_RESULTS } from "./queries";

import { mediumScreen } from "../App/scss/variables.scss";
import CachedImage from "../CachedImage";
import "./scss/index.scss";

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
              <Overlay context={overlayContext}>
                <div
                  className={`search${
                    this.state.search ? " search--full-height" : ""
                  }`}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="search__input">
                    <Media query={{ maxWidth: mediumScreen }}>
                      {matches =>
                        matches ? (
                          <TextField
                            iconLeft={
                              <ReactSVG path={require("../../images/x.svg")} />
                            }
                            iconRight={
                              <ReactSVG
                                path={require("../../images/search.svg")}
                              />
                            }
                            autoFocus={true}
                            onChange={e =>
                              this.setState({ search: e.target.value })
                            }
                          />
                        ) : (
                          <TextField
                            iconRight={
                              <ReactSVG
                                path={require("../../images/search.svg")}
                              />
                            }
                            autoFocus={true}
                            onChange={e =>
                              this.setState({ search: e.target.value })
                            }
                          />
                        )
                      }
                    </Media>
                  </div>
                  {this.state.search ? (
                    <>
                      <div className="search__products">
                        <NetworkStatus>
                          {isOnline => (
                            <Query
                              query={GET_SEARCH_RESULTS}
                              variables={{ query: this.state.search }}
                              fetchPolicy="cache-and-network"
                              errorPolicy="all"
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
                                                url={
                                                  item.node.thumbnailUrl ||
                                                  require("../../images/nophoto.png")
                                                }
                                                url2x={item.node.thumbnailUrl2x}
                                              />
                                              <span>
                                                <h4>{item.node.name}</h4>
                                                <p>{item.node.category.name}</p>
                                              </span>
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                      {loading ? (
                                        <Loader />
                                      ) : (
                                        <div className="search__products__footer">
                                          <Link
                                            to={{
                                              pathname: searchUrl,
                                              search: `?q=${this.state.search}`
                                            }}
                                          >
                                            <Button>Show all results</Button>
                                          </Link>
                                        </div>
                                      )}
                                    </>
                                  );
                                }
                                if (error) {
                                  if (!isOnline) {
                                    return <OfflinePlaceholder />;
                                  }
                                  return `Error!: ${error}`;
                                }
                                return <Loader />;
                              }}
                            </Query>
                          )}
                        </NetworkStatus>
                      </div>
                    </>
                  ) : null}
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
