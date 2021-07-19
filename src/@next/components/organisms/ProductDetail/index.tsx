import React /* useState */ from "react";
import StarRatings from "react-star-ratings";

// import ReactSVG from "react-svg";
// import { gray } from "@styles/constants";
import { ProductDetails_product } from "@temp/views/Product/gqlTypes/ProductDetails";

// import addProductDetail from "../../../../images/productDetailTrolley.svg";
// import { Logo } from "./icon";
import * as S from "./styles";

import "./style.css";

type Props = {
  product: ProductDetails_product;
};

const ProductDetail: React.FC<Props> = ({ product }) => {
  return (
    <div>
      <S.Wraper>
        <S.InfoDetail>
          <S.ProductName>{product.name}</S.ProductName>
          <S.Text>
            <S.ProductReview>
              <S.RateNumber>5.0</S.RateNumber>
              <StarRatings
                rating={5}
                starRatedColor="#188C72"
                numberOfStars={5}
                starDimension="14px"
                starSpacing="1px"
              />
              <S.RateComment>(5 Đánh giá)</S.RateComment>
            </S.ProductReview>
            <S.PriceProduct>260.000đ - 1.000.000đ</S.PriceProduct>
          </S.Text>
          {/* <S.PriceContainer>
            <S.PriceBox>
              <S.Text>1000-9999 Kilogram</S.Text>
              <S.Price>$ 1.00</S.Price>
            </S.PriceBox>
            <S.PriceBox>
              <S.Text>1000-9999 Kilogram</S.Text>
              <S.Price>$ 1.00</S.Price>
            </S.PriceBox>
            <S.PriceBox>
              <S.Text>1000-9999 Kilogram</S.Text>
              <S.Price>$ 1.00</S.Price>
            </S.PriceBox>
          </S.PriceContainer> */}

          {/* <S.Text style={{ marginBottom: 10 }}>Product Price: </S.Text>
          <S.FlexWraper>
            <S.Table>
              <S.Tr>
              {product.variants?.map(item => {
                  return <S.Td key={item?.id}>{item?.name}</S.Td>;
                })}}
              </S.Tr>
              <S.Tr>
                <S.Td>Quantity Available</S.Td>
                {product.variants?.map(item => {
                  return <S.Td key={item?.id}>{item?.quantityAvailable}</S.Td>;
                })}
              </S.Tr>
              <S.Tr>
                <S.Td>Price</S.Td>
                {product.variants?.map(item => {
                  const price = item?.pricing;
                  if (!price) {
                    return;
                  }
                  const currency =
                    price.priceUndiscounted?.gross.currency === "USD"
                      ? "$"
                      : price.priceUndiscounted?.gross.currency;
                  return (
                    <S.Td key={item?.id}>
                      {price?.onSale ? (
                        <div style={{ display: "flex" }}>
                          <div
                            style={{
                              color: gray,
                              marginRight: 4,
                              textDecorationLine: "line-through",
                            }}
                          >
                            {`${price.priceUndiscounted?.gross.amount}${currency} `}
                          </div>
                          <div>{`${price.price?.gross.amount}${currency}`}</div>
                        </div>
                      ) : (
                        <>
                          {`${price.priceUndiscounted?.gross.amount}${currency}`}
                        </>
                      )}
                    </S.Td>
                  );
                })}
              </S.Tr>
            </S.Table>
          </S.FlexWraper>
          <S.FlexWraper style={{ alignItems: "center" }}>
            <S.StrongerText style={{ fontSize: "15px" }}>
              Trade Assurance:{" "}
            </S.StrongerText>
            <S.Text style={{ fontSize: "10px" }}>
              Protect your Alibaba orders{" "}
            </S.Text>
          </S.FlexWraper>
          <S.FlexWraper style={{ alignItems: "center" }}>
            <S.StrongerText style={{ fontSize: "15px" }}>
              Alibaba.com Freight:{" "}
            </S.StrongerText>
            <S.Link
              style={{
                fontSize: "13px",
                borderLeft: "1px solid grey",
                paddingLeft: "10px",
                marginLeft: "10px",
              }}
            >
              CompareRase
            </S.Link>
            <S.Link
              style={{
                fontSize: "13px",
                borderLeft: "1px solid grey",
                paddingLeft: "10px",
                marginLeft: "10px",
              }}
            >
              CompareRase
            </S.Link>
          </S.FlexWraper>
          <S.FlexWraper>
            <S.Text>Payments: </S.Text>
            <S.FlexWraper style={{ alignItems: "center" }}>
              {Logo.map((item, index) => {
                return <S.LogoIcon key={index} src={item} alt="" />;
              })}
            </S.FlexWraper>
          </S.FlexWraper>
           <S.FlexWraper>
            <S.Text style={{ marginRight: "10px" }}>
              Alibaba.com Logistics
            </S.Text>
            <S.Text>Inspection Solution</S.Text>
          </S.FlexWraper> */}
        </S.InfoDetail>
      </S.Wraper>
    </div>
  );
};

export default ProductDetail;
