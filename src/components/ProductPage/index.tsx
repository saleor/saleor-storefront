import classNames from "classnames";
import * as React from "react";
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
import {
  generateCategoryUrl,
  generateProductUrl,
  getGraphqlIdFromDBId,
  maybe
} from "../../core/utils";
import { smallScreen } from "../App/scss/variables.scss";
import { CartContext } from "../CartProvider/context";
import NetworkStatus from "../NetworkStatus";
import { NotFound } from "../NotFound";
import { OfflinePlaceholder } from "../OfflinePlaceholder";
import { TypedProductDetailsQuery } from "./queries";

import "./scss/index.scss";
import { ProductDetails } from "./types/ProductDetails";

const noPhoto = require("../../images/nophoto.png");
const canDisplay = (data: ProductDetails) =>
  maybe(
    () =>
      !!data.product.description &&
      !!data.product.name &&
      !!data.product.price &&
      !!data.product.variants
  );

class ProductPage extends React.Component<RouteComponentProps<{ id }>, {}> {
  fixedElement: React.RefObject<HTMLDivElement> = React.createRef();
  productGallery: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, {
      passive: true
    });
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
      <TypedProductDetailsQuery
        loaderFull
        variables={{
          id: getGraphqlIdFromDBId(this.props.match.params.id, "Product")
        }}
        errorPolicy="all"
        key={this.props.match.params.id}
      >
        {({ data }) => (
          <NetworkStatus>
            {isOnline => {
              if (canDisplay(data)) {
                const { product } = data;
                const breadcrumbs = [
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
                ];

                return (
                  <div className="product-page">
                    <div className="container">
                      <Breadcrumbs breadcrumbs={breadcrumbs} />
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
                                    {product.images.map(image => (
                                      <CachedImage
                                        url={image.url || noPhoto}
                                        key={image.id}
                                      >
                                        <img src={noPhoto} />
                                      </CachedImage>
                                    ))}
                                  </Carousel>
                                </div>
                                <div className="product-page__product__info">
                                  <CartContext.Consumer>
                                    {cart => (
                                      <ProductDescription
                                        name={product.name}
                                        productVariants={product.variants}
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
                                  {product.images.map(image => (
                                    <CachedImage
                                      url={image.url || noPhoto}
                                      key={image.id}
                                    >
                                      <img src={noPhoto} />
                                    </CachedImage>
                                  ))}
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
                                          productVariants={product.variants}
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
              if (data && data.product === null) {
                return <NotFound />;
              }
              if (!isOnline) {
                return <OfflinePlaceholder />;
              }
            }}
          </NetworkStatus>
        )}
      </TypedProductDetailsQuery>
    );
  }
}

export default ProductPage;
