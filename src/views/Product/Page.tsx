import { smallScreen } from "../../globalStyles/scss/variables.scss";

import classNames from "classnames";
import * as React from "react";
import Media from "react-media";
import { Link } from "react-router-dom";

import { RichTextContent } from "@components/atoms";
import { CachedImage, Thumbnail } from "@components/molecules";

import { Breadcrumbs, ProductDescription } from "../../components";
import { CartContext } from "../../components/CartProvider/context";
import { generateCategoryUrl, generateCollectionUrl } from "../../core/utils";
import GalleryCarousel from "./GalleryCarousel";
import OtherProducts from "./Other";
import { ProductDetails_product } from "./types/ProductDetails";
import ArtisanVideo from "./Video";

import noPhotoImg from "../../images/no-photo.svg";

import { structuredData } from "../../core/SEO/Product/structuredData";

class Page extends React.PureComponent<{ product: ProductDetails_product }> {
  fixedElement: React.RefObject<HTMLDivElement> = React.createRef();
  productGallery: React.RefObject<HTMLDivElement> = React.createRef();

  get showCarousel() {
    return this.props.product.images.length > 1;
  }

  populateBreadcrumbs = product => [
    {
      link: generateCategoryUrl(product.category.id, product.category.name),
      value: product.category.name,
    },
  ];

  componentDidMount() {
    if (this.showCarousel) {
      window.addEventListener("scroll", this.handleScroll, {
        passive: true,
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
      const fixedToTop = Math.floor(fixedElement.getBoundingClientRect().top);
      const galleryToTop = Math.floor(
        this.productGallery.current.getBoundingClientRect().top + window.scrollY
      );

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
    const cartContextConsumer = (
      <CartContext.Consumer>
        {cart => (
          <ProductDescription
            name={product.name}
            productVariants={product.variants}
            addToCart={cart.add}
          >
            <RichTextContent descriptionJson={product.descriptionJson} />
          </ProductDescription>
        )}
      </CartContext.Consumer>
    );
    const videoValues = product.collections[0].seoTitle;
    const srcVideo = "https://player.vimeo.com/video/" + videoValues + "?title=0&byline=0&portrait=0&loop=1&autopause=0";
    return (
      <div className="product-page">
        <div className="container">
          <Breadcrumbs breadcrumbs={this.populateBreadcrumbs(product)} />
        </div>
        <div className="container">
          <div className="product-page__product">
            {/* Add script here */}
            <script className="structured-data-list" type="application/ld+json">
              {structuredData(product)}
            </script>

            {/*  */}
            <Media query={{ maxWidth: smallScreen }}>
              {matches =>
                matches ? (
                  <>
                    <GalleryCarousel images={product.images} />
                    <div className="product-page__product__info">
                      {cartContextConsumer}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="product-page__product__gallery"
                      ref={this.productGallery}
                    >
                      {product.images.map((image, index) => (
                        <CachedImage url={image.url} key={image.id}>
                          <Thumbnail source={product} />
                        </CachedImage>
                      ))}
                    </div>
                    <div className="product-page__product__info">
                      <div
                        className={classNames({
                          ["product-page__product__info--fixed"]: this
                            .showCarousel,
                        })}
                        ref={this.fixedElement}
                      >
                        {cartContextConsumer}
                      </div>
                    </div>
                  </>
                )
              }
            </Media>
          </div>

        {videoValues ? <ArtisanVideo srcVideo={srcVideo}/> : ''}

        <div className="home-page__categories">
          <div className="container">
            <h3>Shop by collection</h3>
            <div className="home-page__categories__list">

              <div key={product.collections[0].id}>
                <Link
                  to={generateCollectionUrl(product.collections[0].id, product.collections[0].name)}
                  key={product.collections[0].id}
                >
                  <div
                    className={classNames("home-page__categories__list__image", {
                      "home-page__categories__list__image--no-photo": !product.collections[0].backgroundImage,
                    })}
                    style={{
                      backgroundImage: `url(${
                        product.collections[0].backgroundImage
                          ? product.collections[0].backgroundImage.url
                          : noPhotoImg
                      })`,
                    }}
                  />
                  <h3>{product.collections[0].name}</h3>
                </Link>
              </div>

              <div key={product.collections[1].id}>
                <Link
                  to={generateCollectionUrl(product.collections[1].id, product.collections[1].name)}
                  key={product.collections[1].id}
                >
                  <div
                    className={classNames("home-page__categories__list__image", {
                      "home-page__categories__list__image--no-photo": !product.collections[1].backgroundImage,
                    })}
                    style={{
                      backgroundImage: `url(${
                        product.collections[1].backgroundImage
                          ? product.collections[1].backgroundImage.url
                          : noPhotoImg
                      })`,
                    }}
                  />
                  <h3>{product.collections[1].name}</h3>
                </Link>
              </div>

            </div>
          </div>
        </div>

        </div>

        <OtherProducts products={product.category.products.edges} />
      </div>
    );
  }
}

export default Page;