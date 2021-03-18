import { ProductDetails } from "@saleor/sdk/lib/fragments/gqlTypes/ProductDetails";
import classNames from "classnames";
import React from "react";
import Media from "react-media";
import { generatePath } from "react-router";

import { ProductDescription } from "@components/molecules";
import { ProductGallery } from "@components/organisms";
import AddToCartSection from "@components/organisms/AddToCartSection";
import { paths } from "@paths";

import {
  Breadcrumbs,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "../../components";
import { structuredData } from "../../core/SEO/Product/structuredData";
import GalleryCarousel from "./GalleryCarousel";
import OtherProducts from "./Other";
import { IProps } from "./types";

import { smallScreen } from "../../globalStyles/scss/variables.scss";

const populateBreadcrumbs = (product: ProductDetails) => [
  {
    link: generatePath(paths.category, { slug: product.category.slug }),
    value: product.category.name,
  },
  {
    link: generatePath(paths.product, { slug: product.slug }),
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

      if (variant?.images.length > 0) {
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
            description={product.description}
            attributes={product.attributes}
          />
        </div>
      </div>
      <OtherProducts products={product.category.products.edges} />
    </div>
  );
};

export default Page;
