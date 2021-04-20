import React from "react";
import { FormattedMessage } from "react-intl";

import * as S from "./styles";
import { IProps } from "./types";

export const CompanyProfile: React.FC<IProps> = ({ store }: IProps) => {
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
                  {store ? (
                    <>
                      <S.AttributeName>{store.name}</S.AttributeName>{" "}
                    </>
                  ) : (
                    "-"
                  )}
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="Description" />
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  {store ? (
                    <>
                      <S.AttributeName>
                        {store.description.description}
                      </S.AttributeName>{" "}
                    </>
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
                  {store ? (
                    <>
                      <S.AttributeName>{store.phone}</S.AttributeName>{" "}
                    </>
                  ) : (
                    "-"
                  )}
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="Coordinates" />
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  {store ? (
                    <>
                      <S.AttributeName>{store.latlong}</S.AttributeName>{" "}
                    </>
                  ) : (
                    "-"
                  )}
                </S.CompanyInfoTd>
              </S.CompanyInfoTr>
              <S.CompanyInfoTr>
                <S.CompanyInfoTd>
                  <FormattedMessage defaultMessage="acreage" />
                </S.CompanyInfoTd>
                <S.CompanyInfoTd>
                  {store ? (
                    <>
                      <S.AttributeName>{store.acreage}</S.AttributeName>{" "}
                    </>
                  ) : (
                    "-"
                  )}
                </S.CompanyInfoTd>
              </S.CompanyInfoTr>
            </S.CompanyInfoBody>
          </S.CompanyInfo>
          {/* <S.CompanyLocation>
              <S.SubTitleText>
                <FormattedMessage defaultMessage="Location" />
              </S.SubTitleText>
            </S.CompanyLocation>
            <S.CompanyLocation>
              <S.SubTitleText>
                <FormattedMessage defaultMessage="Images" />
              </S.SubTitleText>
            </S.CompanyLocation> */}
        </S.CompanyWrapInfo>
      </S.WrapBox>
    </S.Wrapper>
  );
};
