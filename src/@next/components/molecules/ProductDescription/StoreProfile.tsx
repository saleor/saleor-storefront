import Link from "next/link";
import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import Marker from "react-google-maps/lib/components/Marker";
// import { FormattedMessage } from "react-intl";
import StarRatings from "react-star-ratings";

import { paths } from "@paths";

import locationIcon from "../../../../images/ios-location.svg";
import telephoneIcon from "../../../../images/telephone-fill.svg";
import { IProps } from "./types";

import "./scss/StoreProfile.scss";

export const StoreProfile: React.FC<IProps> = ({ store }: IProps) => {
  // const tempDescription =
  //   store?.description && store?.description.replace(/'/g, '"');

  const isShowMap = store?.latlong && store?.latlong !== "";

  const lat = store?.latlong ? parseFloat(store.latlong.split(",")[0]) : 0;
  const lng = store?.latlong ? parseFloat(store?.latlong?.split(",")[1]) : 0;

  const position = {
    lat,
    lng,
  };

  const Map = () => (
    <GoogleMap defaultZoom={15} defaultCenter={position}>
      <Marker position={position} />
    </GoogleMap>
  );

  const WrappedMap = withScriptjs<any>(withGoogleMap(Map));
  return (
    <div className="product-page__product__address">
      <div className="product-page__product__address--fixed">
        <div className="product-page__product__address--header">
          <div className="avatar-shop" />
          <div className="infor-shop">
            <div className="infor-shop__name">
              <p>Nam Nguyen</p>
            </div>
            <div className="infor-shop__active">
              <span className="statusActive">Online 14 phút trước</span>
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
          {store?.id && (
            <div
              className="connectShopOption"
              // style={{ display: "flex", justifyContent: "center" }}
            >
              <Link
                href={{
                  pathname: paths.store,
                  query: { id: store.id },
                }}
              >
                <span>Xem Shop</span>
              </Link>
            </div>
          )}
        </div>
        <div className="product-page__product__address--place">
          <div className="addressShop">
            <img src={telephoneIcon} alt="" />
            <span>0932200011</span>
          </div>
          <div className="addressShop">
            <img src={locationIcon} alt="" style={{ marginRight: "4px" }} />
            <span>58 Tố Hữu, Trung Văn, Nam Từ Liêm, Hà Nội</span>
          </div>
        </div>
        {isShowMap && (
          <div className="product-page__product__address--map">
            <WrappedMap
              name="latlong"
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAe38lpcvEH7pLWIbgNUPNHsPnyIYwkc60&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ width: `100%` }} />}
              containerElement={<div style={{ height: `111px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        )}
      </div>
    </div>
  );
};
