import React, { useState } from "react";

// import ImageGallery from "react-image-gallery";
// import ReactImageZoom from "react-image-zoom";
import { Logo } from "./icon";
import * as S from "./styles";

import "./style.css";

interface IProps {}

const ProductDetail: React.FC<IProps> = (props: IProps) => {
  // const propsss = {
  //   width: 700,
  //   // height:800,
  //   zoomWidth: 200,
  //   scale: 1.2,
  //   img: "https://miro.medium.com/max/1135/1*E5VQSUDJZ-mfc_G7NkIZIw.png",
  //   zoomPosition: "right",
  // };

  // const imgs = [
  //   {
  //     original: "https://miro.medium.com/max/1135/1*E5VQSUDJZ-mfc_G7NkIZIw.png",
  //     thumbnail:
  //       "https://miro.medium.com/max/1135/1*E5VQSUDJZ-mfc_G7NkIZIw.png",
  //   },
  //   {
  //     original: "https://miro.medium.com/max/1135/1*E5VQSUDJZ-mfc_G7NkIZIw.png",
  //     thumbnail:
  //       "https://miro.medium.com/max/1135/1*E5VQSUDJZ-mfc_G7NkIZIw.png",
  //   },
  // ];

  // const getImg = (imgs: any[]) => {
  //   return imgs.map(item => {
  //     return {
  //       sizes: 10,
  //       original: item.original,
  //       thumbnail: item.thumbnail,
  //       renderItem: () => {
  //         propsss.img = item.thumbnail;
  //         return <ReactImageZoom {...propsss} />;
  //       },
  //     };
  //   });
  // };

  // const [stt, setStt] = useState(false);
  // const imgGallery = React.createRef<any>();
  return (
    <div>
      <S.Wraper>
        <S.ImgSlide>
          {/* <ReactImageZoom {...propsss} /> */}
          {/* <ImageGallery
            ref={imgGallery}
            items={stt ? imgs : getImg(imgs)}
            showPlayButton={false}
            showNav={false}
            onClick={() => {
              imgGallery.current.fullScreen();
            }}
            onScreenChange={(e: any) => {
              if (e) {
                setStt(true);
              } else {
                setStt(false);
              }
            }}
          /> */}
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
