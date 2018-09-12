import * as React from "react";
import { Query } from "react-apollo";
import Media from "react-media";
import { RouteComponentProps } from "react-router";

import { Breadcrumbs, Carousel, ProductDescription, ProductListItem } from "..";
import {
  getDBIdFromGraphqlId,
  getGraphqlIdFromDBId,
  slugify
} from "../../core/utils";
import { smallScreen } from "../App/scss/variables.scss";
import { GET_PRODUCT_DETAILS } from "./queries";

import "./scss/index.scss";

class ProductPage extends React.Component<RouteComponentProps<{ id }>, {}> {
  fixedElement: React.RefObject<HTMLDivElement> = React.createRef();
  productGallery: React.RefObject<HTMLDivElement> = React.createRef();
  galleryImage: React.RefObject<HTMLImageElement> = React.createRef();

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
      >
        {({ loading, error, data: { product } }) => {
          if (loading) {
            return "Loading";
          }
          if (error) {
            return `Error!: ${error}`;
          }
          return (
            <div className="product-page">
              <div className="container">
                <Breadcrumbs
                  breadcrumbs={[
                    {
                      link: `/category/${slugify(
                        product.category.name
                      )}/${getDBIdFromGraphqlId(
                        product.category.id,
                        "Category"
                      )}/`,
                      value: product.category.name
                    },
                    {
                      link: `/product/${slugify(
                        product.name
                      )}/${getDBIdFromGraphqlId(product.id, "Product")}/`,
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

                                for (let i = 0; i < props.slideCount; i++) {
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
                              {product.images.edges.map(({ node: image }) => (
                                <img
                                  src={"http://localhost:8000" + image.url}
                                  key={image.id}
                                />
                              ))}
                            </Carousel>
                          </div>
                          <div className="product-page__product__info">
                            <ProductDescription product={product} />
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className="product-page__product__gallery"
                            ref={this.productGallery}
                          >
                            {product.images.edges.map(({ node: image }) => (
                              <img
                                src={"http://localhost:8000" + image.url}
                                key={image.id}
                                ref={this.galleryImage}
                              />
                            ))}
                          </div>
                          <div className="product-page__product__info">
                            <div
                              className="product-page__product__info--fixed"
                              ref={this.fixedElement}
                            >
                              <ProductDescription product={product} />
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
                        <ProductListItem product={product} key={product.id} />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProductPage;
