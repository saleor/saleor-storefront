import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import { RichTextEditorContent } from "@components/atoms";
import { grayMedium } from "@styles/constants";

import * as S from "./styles";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap !important;
`;
const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  width: 100%;
`;

const ListItem = styled.div`
  width: 50%;
  display: flex;
  margin-top: 0.5rem;
  @media (max-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 1rem 0;
  background: ${grayMedium};
`;
type Props = {
  description: string | undefined;
};
export const ProductDetailTab: React.FC<Props> = ({ description }) => {
  const mockData = [
    {
      title: "Style",
      value: "Fresh",
    },
    {
      title: "Product Type",
      value: "Citrus Fruit",
    },
    { title: "Type", value: "Orange" },
    { title: "Cultivation Type", value: "Organic" },
    { title: "Color", value: "orange" },
    { title: "Certification", value: "ISO" },
    { title: "Grade", value: "high" },
    { title: "Maturity", value: "1" },
    { title: "Size (cm)", value: "10" },
    { title: "Weight (kg)", value: "0.25" },
    {
      title: "Place of Origin",
      value: "South Africa",
    },
    {
      title: "Brand Name",
      value: "1",
    },
    { title: "Model Number", value: "1" },
  ];

  return (
    <S.Wrapper>
      <S.WrapBox>
        <S.CompanyImage>
          <S.TitleText>
            <FormattedMessage defaultMessage="Quick Detail" />
          </S.TitleText>
        </S.CompanyImage>
        <Wrapper>
          <List>
            {mockData.map((item, index) => {
              return (
                <ListItem key={index}>
                  <div style={{ flex: 1, fontWeight: "bold" }}>
                    {item.title}:
                  </div>
                  <div style={{ flex: 2 }}>{item.value}</div>
                </ListItem>
              );
            })}
          </List>
        </Wrapper>
        <Line />
        <S.CompanyImage>
          <S.TitleText>
            <FormattedMessage defaultMessage="Description" />
          </S.TitleText>
          <RichTextEditorContent jsonData={description} />
        </S.CompanyImage>
      </S.WrapBox>
    </S.Wrapper>
  );
};
