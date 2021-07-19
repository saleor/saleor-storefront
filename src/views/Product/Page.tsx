// import StarRatings from "react-star-ratings";
// import ReactSVG from "react-svg";
import classNames from "classnames";
import React from "react";
// import {
//   GoogleMap,
//   Marker,
//   withGoogleMap,
//   withScriptjs,
// } from "react-google-maps";
// import { FormattedMessage } from "react-intl";
import Media from "react-media";

// import styled from "styled-components";
import { ProductDescription } from "@components/molecules";
import { ProductGallery } from "@components/organisms";
import AddToCartSection from "@components/organisms/AddToCartSection";
import ProductDetail from "@components/organisms/ProductDetail";
// import { orange, white } from "@styles/constants";
import ChatBox from "@temp/components/ChatBox";

import { StoreProfile } from "../../@next/components/molecules/ProductDescription/StoreProfile";
import {
  Breadcrumbs,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "../../components";
import { structuredData } from "../../core/SEO/Product/structuredData";
import { generateCategoryUrl, generateProductUrl } from "../../core/utils";
// import locationIcon from "../../images/ios-location.svg";
// import telephoneIcon from "../../images/telephone-fill.svg";
// import { ContactSupplier } from "./ContactSupplier";
import GalleryCarousel from "./GalleryCarousel";
import SlideCarousel from "./SlideCarousel";
import { IProps } from "./types";

import { smallScreen } from "../../globalStyles/scss/variables.scss";

// const StyledButton = styled.div`
//   cursor: pointer;
//   // border-radius: 30px;
//   background: ${orange};
//   padding: 0.75rem;
//   color: ${white};
//   text-align: center;
//   // margin-right: 2rem;
//   position: absolute;
//   top: 0;
//   right: 1rem;
// `;

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

  // const contactSupplierRef = React.useRef(null);

  // const executeScroll = () => contactSupplierRef.current.scrollIntoView();

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
  // const containerStyle = {
  //   width: "400px",
  //   height: "400px",
  // };
  // const center = {
  //   lat: -3.745,
  //   lng: -38.523,
  // };
  // const MyMapComponent = withScriptjs(
  //   withGoogleMap((props: any) => (
  //     <GoogleMap defaultZoom={2} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
  //       {props.isMarkerShown && (
  //         <Marker position={{ lat: -34.397, lng: 150.644 }} />
  //       )}
  //     </GoogleMap>
  //   ))
  // );

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
                  <div className="product-page__product__information">
                    <ProductDetail product={product} />
                    <div
                      style={{
                        display: "flex",
                        marginTop: 16,
                      }}
                    >
                      {/* <StyledButton onClick={() => executeScroll()}>
                        <FormattedMessage defaultMessage="Request Quota" />
                      </StyledButton> */}
                      <div className="product-page__product__buy">
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
                  <div className="product-page__product__information">
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
                        {/* <StyledButton onClick={() => executeScroll()}>
                          <FormattedMessage defaultMessage="Request Quota" />
                        </StyledButton> */}
                        <div
                          className="product-page__product__buy"
                          style={{ width: "100% !important" }}
                        >
                          {addToCartSection}
                        </div>
                      </div>
                    </div>
                  </div>
                  <StoreProfile store={product.store} />
                  {/* <div className="product-page__product__address">
                    <div className="product-page__product__address--fixed">
                      <div className="product-page__product__address--header">
                        <div className="avatar-shop" />
                        <div className="infor-shop">
                          <div className="infor-shop__name">
                            <p>Nam Nguyen</p>
                          </div>
                          <div className="infor-shop__active">
                            <span className="statusActive">
                              Online 14 phút trước
                            </span>
                            <span className="statusFollow">Theo dõi</span>
                          </div>
                        </div>
                      </div>
                      <div className="product-page__product__address--productReviews">
                        <div className="customer">
                          <div className="customer__starNumber">
                            <div className="title">
                              <span>5.0</span>
                              <span>
                                <StarRatings
                                  rating={1}
                                  starRatedColor="#188C72"
                                  numberOfStars={1}
                                  starDimension="15px"
                                />
                              </span>
                            </div>
                            <div className="description">
                              <span>365 đánh giá</span>
                            </div>
                          </div>
                          <div className="customer__followNumber">
                            <div className="title">
                              <span>623</span>
                            </div>
                            <div className="description">
                              <span>người theo dõi</span>
                            </div>
                          </div>
                          <div className="customer__percent">
                            <div className="title">
                              <span>99%</span>
                            </div>
                            <div className="description">
                              <span>tỉ lệ phản hồi</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="product-page__product__address--connectShop">
                        <div className="connectShopOption">
                          <img src="" alt="" />
                          <span>Chat ngay</span>
                        </div>
                        <div className="connectShopOption">
                          <span>Xem Shop</span>
                        </div>
                      </div>
                      <div className="product-page__product__address--place">
                        <div className="addressShop">
                          <img src={telephoneIcon} alt="" />
                          <span>0932200011</span>
                        </div>
                        <div
                          className="addressShop"
                          style={{ marginLeft: "1px" }}
                        >
                          <ReactSVG path={locationIcon} />
                          <span>58 Tố Hữu, Trung Văn, Nam Từ Liêm, Hà Nội</span>
                        </div>
                      </div>
                      <div className="product-page__product__address--map">
                        <MyMapComponent
                          isMarkerShown
                          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                          loadingElement={<div style={{ height: `100%` }} />}
                          containerElement={<div style={{ height: `115px` }} />}
                          mapElement={<div style={{ height: `100%` }} />}
                        />
                      </div>
                    </div>
                  </div> */}
                </>
              )
            }
          </Media>
        </div>
        <div className="product-page__product__description" id="price">
          <ProductDescription
            description={product.description}
            attributes={product.attributes}
            store={product.store}
          />
        </div>
        {/* <div ref={contactSupplierRef}>
          <ContactSupplier
            productID={product.id}
            storeID={(product.store && product.store.id) || ""}
          />
        </div> */}

        <SlideCarousel products={product.category.products.edges} />
        <SlideCarousel products={product.category.products.edges} />
      </div>
      <ChatBox />
    </div>
  );
};

export default Page;
