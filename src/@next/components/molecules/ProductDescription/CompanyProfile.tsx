import React from "react";
import { FormattedMessage } from "react-intl";

import * as S from "./styles";
import { IProps } from "./types";

export const CompanyProfile: React.FC<IProps> = ({ attributes }: IProps) => {
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
                  <FormattedMessage defaultMessage="Store Name" />
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="-" />
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="Store Category" />
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="-" />
                </S.CompanyInfoTd>
              </S.CompanyInfoTr>
              <S.CompanyInfoTr>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="Store Description" />
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="-" />
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="Store Coordinates" />
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="-" />
                </S.CompanyInfoTd>
              </S.CompanyInfoTr>
              <S.CompanyInfoTr>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="Store PhoneNumber" />
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="-" />
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="Store Address" />
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="-" />
                </S.CompanyInfoTd>
              </S.CompanyInfoTr>
            </S.CompanyInfoBody>
          </S.CompanyInfo>
          <S.CompanyLocation>
            <S.SubTitleText>
              <FormattedMessage defaultMessage="Store Location" />
            </S.SubTitleText>
          </S.CompanyLocation>
        </S.CompanyWrapInfo>
        <button>go to store page</button>
      </S.WrapBox>
    </S.Wrapper>
  );
};
