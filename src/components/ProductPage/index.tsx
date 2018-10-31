import classNames from "classnames";
import * as React from "react";
import { Query } from "react-apollo";
import Media from "react-media";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import {
  Breadcrumbs,
  CachedImage,
  Carousel,
  Loader,
  ProductDescription,
  ProductListItem
} from "..";
import { ProductDetails } from "../../core/types/saleor";
import {
  generateCategoryUrl,
  generateProductUrl,
  getGraphqlIdFromDBId
} from "../../core/utils";
import { smallScreen } from "../App/scss/variables.scss";
import { CartContext } from "../CartProvider/context";
import NetworkStatus from "../NetworkStatus";
import { Offline } from "../Offline";
import { GET_PRODUCT_DETAILS } from "./queries";

import "./scss/index.scss";

const canDisplay = (data: ProductDetails) =>
  data &&
  data.product &&
  data.product.description &&
  data.product.name &&
  data.product.price &&
  data.product.variants &&
  data.product.variants.edges;

class ProductPage extends React.Component<RouteComponentProps<{ id }>, {}> {
  fixedElement: React.RefObject<HTMLDivElement> = React.createRef();
  productGallery: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const productGallery = this.productGallery.current;
    const fixedElement = this.fixedElement.current;

    if (productGallery && fixedElement) {
      const containerPostion =
        window.innerHeight - productGallery.getBoundingClientRect().bottom;
      const fixedPosition =
        window.innerHeight - fixedElement.getBoundingClientRect().bottom;
      const fixedToTop = fixedElement.getBoundingClientRect().top;
      const galleryToTop =
        this.productGallery.current.getBoundingClientRect().top +
        window.scrollY;

      if (containerPostion >= fixedPosition && fixedToTop <= galleryToTop) {
        fixedElement.classList.remove("product-page__product__info--fixed");
        fixedElement.classList.add("product-page__product__info--absolute");
      } else {
        fixedElement.classList.remove("product-page__product__info--absolute");
        fixedElement.classList.add("product-page__product__info--fixed");
      }
    }
  };

  render() {
    return (
      <Query
        query={GET_PRODUCT_DETAILS}
        variables={{
          id: getGraphqlIdFromDBId(this.props.match.params.id, "Product")
        }}
        fetchPolicy="cache-and-network"
        errorPolicy="all"
      >
        {({ error, data }) => (
          <NetworkStatus>
            {isOnline => {
              if (canDisplay(data)) {
                const { product } = data;
                return (
                  <div className="product-page">
                    <div className="container">
                      <Breadcrumbs
                        breadcrumbs={[
                          {
                            link: generateCategoryUrl(
                              product.category.id,
                              product.category.name
                            ),
                            value: product.category.name
                          },
                          {
                            link: generateProductUrl(product.id, product.name),
                            value: product.name
                          }
                        ]}
                      />
                    </div>
                    <div className="container">
                      <div className="product-page__product">
                        <Media query={{ maxWidth: smallScreen }}>
                          {matches =>
                            matches ? (
                              <>
                                <div className="product-page__product__gallery">
                                  <Carousel
                                    renderCenterLeftControls={() => null}
                                    renderCenterRightControls={() => null}
                                    renderBottomCenterControls={props => {
                                      const indexes = [];

                                      for (
                                        let i = 0;
                                        i < props.slideCount;
                                        i++
                                      ) {
                                        indexes.push(i);
                                      }

                                      return (
                                        <ul className="product-page__product__gallery__nav">
                                          {indexes.map(index => (
                                            <li
                                              key={index}
                                              onClick={props.goToSlide.bind(
                                                null,
                                                index
                                              )}
                                              className={
                                                props.currentSlide === index
                                                  ? "active"
                                                  : ""
                                              }
                                            >
                                              <span />
                                            </li>
                                          ))}
                                        </ul>
                                      );
                                    }}
                                  >
                                    {product.images.edges.map(
                                      ({ node: image }) => (
                                        <CachedImage
                                          url={image.url}
                                          key={image.id}
                                        >
                                          <Offline />
                                        </CachedImage>
                                      )
                                    )}
                                  </Carousel>
                                </div>
                                <div className="product-page__product__info">
                                  <CartContext.Consumer>
                                    {cart => (
                                      <ProductDescription
                                        name={product.name}
                                        price={product.price}
                                        productVariants={product.variants.edges.map(
                                          edge => edge.node
                                        )}
                                        addToCart={cart.add}
                                      >
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: product.description
                                          }}
                                        />
                                      </ProductDescription>
                                    )}
                                  </CartContext.Consumer>
                                </div>
                              </>
                            ) : (
                              <>
                                <div
                                  className="product-page__product__gallery"
                                  ref={this.productGallery}
                                >
                                  {product.images.edges.map(
                                    ({ node: image }) => (
                                      <CachedImage
                                        url={image.url}
                                        key={image.id}
                                      >
                                        <Offline />
                                      </CachedImage>
                                    )
                                  )}
                                </div>
                                <div className="product-page__product__info">
                                  <div
                                    className={classNames({
                                      ["product-page__product__info--fixed"]: true
                                    })}
                                    ref={this.fixedElement}
                                  >
                                    <CartContext.Consumer>
                                      {cart => (
                                        <ProductDescription
                                          name={product.name}
                                          price={product.price}
                                          productVariants={product.variants.edges.map(
                                            edge => edge.node
                                          )}
                                          addToCart={cart.add}
                                        >
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: product.description
                                            }}
                                          />
                                        </ProductDescription>
                                      )}
                                    </CartContext.Consumer>
                                  </div>
                                </div>
                              </>
                            )
                          }
                        </Media>
                      </div>
                    </div>
                    <div className="product-page__other-products">
                      <div className="container">
                        <h4 className="product-page__other-products__title">
                          Other products in this category
                        </h4>
                        <div className="product-page__other-products__grid">
                          {product.category.products.edges.map(
                            ({ node: product }) => (
                              <Link
                                to={generateProductUrl(
                                  product.id,
                                  product.name
                                )}
                                key={product.id}
                              >
                                <ProductListItem
                                  product={product}
                                  key={product.id}
                                />
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              if (!isOnline) {
                return <Offline />;
              }
              if (error) {
                return `Error!: ${error}`;
              }
              return <Loader full />;
            }}
          </NetworkStatus>
        )}
      </Query>
    );
  }
}

export default ProductPage;
