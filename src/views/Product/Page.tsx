import { smallScreen } from "../../components/App/scss/variables.scss";

import classNames from "classnames";
import * as React from "react";
import Media from "react-media";

import { Breadcrumbs, CachedImage, ProductDescription } from "../../components";
import { CartContext } from "../../components/CartProvider/context";
import { generateCategoryUrl, generateProductUrl } from "../../core/utils";
import GalleryCarousel from "./GalleryCarousel";
import OtherProducts from "./Other";
import { ProductDetails_product } from "./types/ProductDetails";

const noPhoto = require("../../images/nophoto.png");

class Page extends React.PureComponent<{ product: ProductDetails_product }> {
  fixedElement: React.RefObject<HTMLDivElement> = React.createRef();
  productGallery: React.RefObject<HTMLDivElement> = React.createRef();

  get showCarousel() {
    return this.props.product.images.length > 1;
  }

  populateBreadcrumbs = product => [
    {
      link: generateCategoryUrl(product.category.id, product.category.name),
      value: product.category.name
    },
    {
      link: generateProductUrl(product.id, product.name),
      value: product.name
    }
  ];

  componentDidMount() {
    if (this.showCarousel) {
      window.addEventListener("scroll", this.handleScroll, {
        passive: true
      });
    }
  }

  componentWillUnmount() {
    if (this.showCarousel) {
      window.removeEventListener("scroll", this.handleScroll);
    }
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
    const { product } = this.props;

    return (
      <div className="product-page">
        <div className="container">
          <Breadcrumbs breadcrumbs={this.populateBreadcrumbs(product)} />
        </div>
        <div className="container">
          <div className="product-page__product">
            <Media query={{ maxWidth: smallScreen }}>
              {matches =>
                matches ? (
                  <>
                    <GalleryCarousel images={product.images} />
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
                        <CachedImage url={image.url || noPhoto} key={image.id}>
                          <img src={noPhoto} />
                        </CachedImage>
                      ))}
                    </div>
                    <div className="product-page__product__info">
                      <div
                        className={classNames({
                          ["product-page__product__info--fixed"]: this
                            .showCarousel
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
        <OtherProducts products={product.category.products.edges} />
      </div>
    );
  }
}

export default Page;
