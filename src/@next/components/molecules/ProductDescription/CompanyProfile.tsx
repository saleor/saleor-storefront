import Link from "next/link";
import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import Marker from "react-google-maps/lib/components/Marker";
import { FormattedMessage } from "react-intl";

import { paths } from "@paths";

import * as S from "./styles";
import { IProps } from "./types";

export const CompanyProfile: React.FC<IProps> = ({ store }: IProps) => {
  const tempDescription =
    store?.description && store?.description.replace(/'/g, '"');

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
    <S.Wrapper>
      <S.WrapBox>
        <S.CompanyImage>
          <S.TitleText>
            <FormattedMessage defaultMessage="Company Overview" />
          </S.TitleText>
        </S.CompanyImage>
        <S.CompanyWrapInfo>
          <S.CompanyInfo>
            <S.CompanyInfoBody>
              <S.CompanyInfoTr>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="Name" />
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  <S.AttributeName>{store?.name || "-"}</S.AttributeName>
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="Description" />
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  {tempDescription &&
                  JSON.parse(tempDescription).description ? (
                    <S.AttributeName>
                      {JSON.parse(tempDescription).description}
                    </S.AttributeName>
                  ) : (
                    "-"
                  )}
                </S.CompanyInfoTd>
              </S.CompanyInfoTr>
              <S.CompanyInfoTr>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="Phone" />
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  <S.AttributeName>{store?.phone || "-"}</S.AttributeName>{" "}
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="Acreage" />
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  <S.AttributeName>{store?.acreage || "-"}</S.AttributeName>
                </S.CompanyInfoTd>
              </S.CompanyInfoTr>
            </S.CompanyInfoBody>
          </S.CompanyInfo>
        </S.CompanyWrapInfo>

        {isShowMap && (
          <div>
            <WrappedMap
              name="latlong"
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAe38lpcvEH7pLWIbgNUPNHsPnyIYwkc60&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ width: `100%` }} />}
              containerElement={<div style={{ height: `200px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        )}

        {store?.id && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link
              href={{
                pathname: paths.store,
                query: { id: store.id },
              }}
            >
              <S.ButtonStore>Go To Store Page</S.ButtonStore>
            </Link>
          </div>
        )}
      </S.WrapBox>
    </S.Wrapper>
  );
};
