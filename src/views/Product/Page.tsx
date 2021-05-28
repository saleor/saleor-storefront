import classNames from "classnames";
import React from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-media";
import styled from "styled-components";

import { ProductDescription } from "@components/molecules";
import { ProductGallery } from "@components/organisms";
import AddToCartSection from "@components/organisms/AddToCartSection";
import ProductDetail from "@components/organisms/ProductDetail";
import { orange, white } from "@styles/constants";
import ChatBox from "@temp/components/ChatBox";

import {
  Breadcrumbs,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "../../components";
import { structuredData } from "../../core/SEO/Product/structuredData";
import { generateCategoryUrl, generateProductUrl } from "../../core/utils";
import { ContactSupplier } from "./ContactSupplier";
import GalleryCarousel from "./GalleryCarousel";
import SlideCarousel from "./SlideCarousel";
import { IProps } from "./types";

import { smallScreen } from "../../globalStyles/scss/variables.scss";

const StyledButton = styled.div`
  cursor: pointer;
  // border-radius: 30px;
  background: ${orange};
  padding: 0.75rem;
  color: ${white};
  text-align: center;
  // margin-right: 2rem;
  position: absolute;
  top: 0;
  right: 1rem;
`;

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
  const productGallery: React.RefObject<HTMLDivElement> = React.useRef();
  const overlayContext = React.useContext(OverlayContext);
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

  const contactSupplierRef = React.useRef(null);

  const executeScroll = () => contactSupplierRef.current.scrollIntoView();

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
                    <ProductDetail product={product} />
                    <div
                      style={{
                        display: "flex",
                        marginTop: 16,
                      }}
                    >
                      <StyledButton onClick={() => executeScroll()}>
                        <FormattedMessage defaultMessage="Contact Supplier" />
                      </StyledButton>
                      <div className="product-page__product__info">
                        {addToCartSection}
                      </div>
                    </div>
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
                      <ProductDetail product={product} />
                      <div
                        style={{
                          display: "flex",
                          marginTop: 16,
                        }}
                      >
                        <StyledButton onClick={() => executeScroll()}>
                          <FormattedMessage defaultMessage="Contact Supplier" />
                        </StyledButton>
                        <div
                          className="product-page__product__info"
                          style={{ width: "100% !important" }}
                        >
                          {addToCartSection}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            }
          </Media>
        </div>
        <div className="product-page__product__description">
          <ProductDescription
            description={product.description}
            attributes={product.attributes}
            store={product.store}
          />
        </div>
        <div ref={contactSupplierRef}>
          <ContactSupplier />
        </div>

        <SlideCarousel products={product.category.products.edges} />
      </div>
      <ChatBox />
    </div>
  );
};

export default Page;
