import React from "react";
import * as S from "./styles";
import { Logo } from "./icon";
import ImageGallery from "react-image-gallery";
import "./style.css";

interface IProps {}

const ProductDetail: React.FC<IProps> = (props: IProps) => {
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  return (
    <div>
      <S.Wraper>
        <S.ImgSlide>
          <ImageGallery items={images} />
        </S.ImgSlide>
        <S.InfoDetail>
          <S.ProductName>thanghoian123</S.ProductName>
          <S.Text style={{ paddingLeft: "15px" }}>
            FOB <S.StrongerText>reference </S.StrongerText> Price:{" "}
            <S.Link>Get Latest Price</S.Link>
          </S.Text>
          {/* <S.Divider/> */}
          <S.PriceContainer>
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
          </S.PriceContainer>
          <S.FlexWraper>
            <S.Text>Lead Time: </S.Text>
            <S.Table>
              <S.Tr>
                <S.Td>Quantity (Kilograms)</S.Td>
                <S.Td>1-1000000</S.Td>
                <S.Td>{">"} 10000000</S.Td>
              </S.Tr>
              <S.Tr>
                <S.Td>Quantity (Kilograms)</S.Td>
                <S.Td>1-1000000</S.Td>
                <S.Td>{">"} 10000000</S.Td>
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
            <S.FlexWraper>
              {Logo.map((item, index) => {
                console.log(item);
                return <S.LogoIcon key={index} src={item} alt="" />;
              })}
            </S.FlexWraper>
          </S.FlexWraper>
          <S.FlexWraper>
            <S.Text style={{ marginRight: "10px" }}>
              Alibaba.com Logistics
            </S.Text>
            <S.Text>Inspection Solution</S.Text>
          </S.FlexWraper>
        </S.InfoDetail>
      </S.Wraper>
    </div>
  );
};

export default ProductDetail;
