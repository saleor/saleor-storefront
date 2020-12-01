import classNames from "classnames";
import React from "react";
import Media from "react-media";
import { Link } from "react-router-dom";
import { ProductDescription } from "@components/molecules";
import { ProductGallery } from "@components/organisms";
import AddToCartSection from "@components/organisms/AddToCartSection";
import { smallScreen } from "../../globalStyles/scss/variables.scss";

import {
  Breadcrumbs,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "../../components";
import {
  generateCategoryUrl,
  generateCollectionUrl,
  generateProductUrl,
} from "../../core/utils";
import GalleryCarousel from "./GalleryCarousel";
import OtherProducts from "./Other";

import ArtisanVideo from "./Video";

import noPhotoImg from "../../images/no-photo.svg";

import { structuredData } from "../../core/SEO/Product/structuredData";
import { IProps } from "./types";

const populateBreadcrumbs = product => [
  {
    link: generateCategoryUrl(product.category.id, product.category.name),
    value: product.category.name,
  },
  {
    link: generateProductUrl(product.id, product.name),
    value: product.name,
  },
];

const Page: React.FC<
  IProps & {
    queryAttributes: Record<string, string>;
    onAttributeChangeHandler: (slug: string | null, value: string) => void;
  }
> = ({ add, product, items, queryAttributes, onAttributeChangeHandler }) => {
  const overlayContext = React.useContext(OverlayContext);

  const productGallery: React.RefObject<HTMLDivElement> = React.useRef();

  const [variantId, setVariantId] = React.useState("");

  const getImages = () => {
    if (product.variants && variantId) {
      const variant = product.variants.find(
        variant => variant.id === variantId
      );

      if (variant.images.length > 0) {
        return variant.images;
      }
    }

    return product.images;
  };

  const handleAddToCart = (variantId, quantity) => {
    add(variantId, quantity);
    overlayContext.show(OverlayType.cart, OverlayTheme.right);
  };

  const addToCartSection = (
    <AddToCartSection
      items={items}
      productId={product.id}
      name={product.name}
      productVariants={product.variants}
      productPricing={product.pricing}
      queryAttributes={queryAttributes}
      setVariantId={setVariantId}
      variantId={variantId}
      onAddToCart={handleAddToCart}
      onAttributeChangeHandler={onAttributeChangeHandler}
      isAvailableForPurchase={product.isAvailableForPurchase}
      availableForPurchase={product.availableForPurchase}
    />
  );

  const videoValues = !(
    Object.keys(product.collections[0].metadata).length === 0
  );
  const srcVideo = videoValues
    ? `https://player.vimeo.com/video/${product.collections[0].metadata[0].value}?title=0&byline=0&portrait=0&loop=1&autopause=0`
    : "";

  return (
    <div className="product-page">
      <div className="container">
        <Breadcrumbs breadcrumbs={populateBreadcrumbs(product)} />
      </div>
      <div className="container">
        <div className="product-page__product">
          <script className="structured-data-list" type="application/ld+json">
            {structuredData(product)}
          </script>
          <Media query={{ maxWidth: smallScreen }}>
            {matches =>
              matches ? (
                <>
                  <GalleryCarousel images={getImages()} />
                  <div className="product-page__product__info">
                    {addToCartSection}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="product-page__product__gallery"
                    ref={productGallery}
                  >
                    <ProductGallery images={getImages()} />
                  </div>
                  <div className="product-page__product__info">
                    <div
                      className={classNames(
                        "product-page__product__info--fixed"
                      )}
                    >
                      {addToCartSection}
                    </div>
                  </div>
                </>
              )
            }
          </Media>
        </div>
      </div>
      <div className="container">
        <div className="product-page__product__description">
          <ProductDescription
            descriptionJson={product.descriptionJson}
            attributes={product.attributes}
          />
        </div>
      </div>
      {videoValues ? <ArtisanVideo srcVideo={srcVideo} /> : ""}
      <div className="product-page__categories">
        <div className="container">
          <h3>Shop by collection | category</h3>
          <div className="product-page__categories__list">
            <div key={product.collections[0].id}>
              <Link
                to={generateCollectionUrl(
                  product.collections[0].id,
                  product.collections[0].name
                )}
                key={product.collections[0].id}
              >
                <div
                  className={classNames(
                    "product-page__categories__list__image",
                    {
                      "product-page__categories__list__image--no-photo": !product
                        .collections[0].backgroundImage,
                    }
                  )}
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

            <div key={product.category.id}>
              <Link
                to={generateCategoryUrl(
                  product.category.id,
                  product.category.name
                )}
                key={product.category.id}
              >
                <div
                  className={classNames(
                    "product-page__categories__list__image",
                    {
                      "product-page__categories__list__image--no-photo": !product
                        .category.backgroundImage,
                    }
                  )}
                  style={{
                    backgroundImage: `url(${
                      product.category.backgroundImage
                        ? product.category.backgroundImage.url
                        : noPhotoImg
                    })`,
                  }}
                />
                <h3>{product.category.name}</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <OtherProducts products={product.category.products.edges} />
    </div>
  );
};

export default Page;
