import { useAuth } from "@saleor/sdk";
import React from "react";

import { Tile } from "@components/atoms";

import * as S from "./styles";

export const ProfileUser: React.FC = () => {
  const { user } = useAuth();

  return (
    <S.TileWrapper>
      <Tile>
        <S.FlexDiv>
          <S.UpLoadPhoto>
            <S.WrapperUpload>
              <S.Img
                src="//gtms01.alicdn.com/tps/i1/TB1vdHdIpXXXXXYXXXXF5vTHFXX-60-59.png"
                alt=""
              />
            </S.WrapperUpload>
            <S.TextAlign>
              <S.LinkTagPU href="#">Upload Photo</S.LinkTagPU>
            </S.TextAlign>
          </S.UpLoadPhoto>

          <S.FlexChild>
            <S.FlexFourCol>
              <S.DisplayMarginP>
                <S.FlexSpanOneCol>Your Member ID:</S.FlexSpanOneCol>
                <S.FlexSpanThreeCol>{user?.id}</S.FlexSpanThreeCol>
              </S.DisplayMarginP>
              <S.DisplayMarginP>
                <S.FlexSpanOneCol>Email:</S.FlexSpanOneCol>
                <S.FlexSpanThreeCol>{user?.email}</S.FlexSpanThreeCol>
              </S.DisplayMarginP>
              <S.DisplayP>
                <S.FlexSpanOneCol>Linked Mobile:</S.FlexSpanOneCol>
                <S.FlexSpanThreeCol>
                  <S.LinkTagPU href="#">Enter Mobile Number</S.LinkTagPU>
                </S.FlexSpanThreeCol>
              </S.DisplayP>
            </S.FlexFourCol>

            <S.FlexDivTwoCol>
              <S.MarginTop>
                <S.LinkTagPU href="#">Change Email Address</S.LinkTagPU>
              </S.MarginTop>
            </S.FlexDivTwoCol>
          </S.FlexChild>
        </S.FlexDiv>
      </Tile>
    </S.TileWrapper>
  );
};
