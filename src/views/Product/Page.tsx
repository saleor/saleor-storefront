import classNames from "classnames";
import React from "react";
import Media from "react-media";
import { Link } from "react-router-dom";
import { usePreferences } from "@hooks";
import { RichTextContent } from "@components/atoms";
import { ProductDescription } from "@components/molecules";
import { ProductGallery } from "@components/organisms";
import AddToCartSection from "@components/organisms/AddToCartSection";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  PinterestIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";
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
import * as S from "./styles";

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

  const {
    preferences: { locale },
  } = usePreferences();

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

  const MetaVideo = product.collections[0].metadata.find(
    element => element.key === "vimeo_id"
  );
  const srcVideo = MetaVideo
    ? `https://player.vimeo.com/video/${MetaVideo.value}?title=0&byline=0&portrait=0&loop=1&autopause=0`
    : "";

  return (
    <div className="product-page">
      <div className="container">
        <Breadcrumbs breadcrumbs={populateBreadcrumbs(product)} />
      </div>
      <S.SocialShareSelection>
        <S.SocialButton>
          <FacebookShareButton url={window.location.href}>
            <FacebookIcon path="/" size={32} bgStyle={{ fill: "#0D233F" }} />
          </FacebookShareButton>
        </S.SocialButton>
        <S.SocialButton>
          <PinterestShareButton
            url={window.location.href}
            media="/images/favicons/favicon-16x16.png"
          >
            <PinterestIcon path="/" size={32} bgStyle={{ fill: "#0D233F" }} />
          </PinterestShareButton>
        </S.SocialButton>
        <S.SocialButton>
          <TwitterShareButton url={window.location.href}>
            <TwitterIcon path="/" size={32} bgStyle={{ fill: "#0D233F" }} />
          </TwitterShareButton>
        </S.SocialButton>
        <S.SocialButton>
          <EmailShareButton url={window.location.href}>
            <EmailIcon path="/" size={32} bgStyle={{ fill: "#0D233F" }} />
          </EmailShareButton>
        </S.SocialButton>
      </S.SocialShareSelection>
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
                    <ProductDescription
                      descriptionJson={product.descriptionJson}
                      attributes={product.attributes}
                    />
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
                      <ProductDescription
                        descriptionJson={
                          locale === "en" &&
                          product.translation?.descriptionJson
                            ? product.translation.descriptionJson
                            : product.descriptionJson
                        }
                        attributes={product.attributes}
                      />
                    </div>
                  </div>
                </>
              )
            }
          </Media>
        </div>
      </div>
      {MetaVideo ? <ArtisanVideo srcVideo={srcVideo} /> : ""}
      <OtherProducts products={product.category.products.edges} />
      <div className="product-page__categories">
        <div className="container">
          <h3>Shop by Collection</h3>
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
              </Link>
            </div>

            <div className="collection__content">
              <h3>
                {locale === "en" && product.collections[0].translation?.name
                  ? product.collections[0].translation.name
                  : product.collections[0].name}
              </h3>
              <RichTextContent
                descriptionJson={
                  locale === "en" &&
                  product.collections[0].translation?.descriptionJson
                    ? product.collections[0].translation.descriptionJson
                    : product.collections[0].descriptionJson
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
