/* eslint-disable import/namespace */
import React from "react";
import { FormattedMessage } from "react-intl";

import { CompanyProfile } from "./CompanyProfile";
import { ProductDetailTab } from "./ProductDetailTab";
import * as S from "./styles";
import { IProps } from "./types";

enum TABS {
  DESCRIPTION = "DESCRIPION",
  ATTRIBUTES = "ATTRIBUTES",
}

export const ProductDescription: React.FC<IProps> = ({
  description,
  attributes,
  store,
}: IProps) => {
  const [activeTab, setActiveTab] = React.useState<TABS>(TABS.DESCRIPTION);

  return (
    <S.Wrapper>
      <S.Tabs>
        <S.TabTitle
          active={activeTab === TABS.DESCRIPTION}
          onClick={evt => {
            evt.stopPropagation();
            setActiveTab(TABS.DESCRIPTION);
          }}
        >
          <FormattedMessage defaultMessage="Product Detail" />
        </S.TabTitle>
        <S.TabTitle
          active={activeTab === TABS.ATTRIBUTES}
          onClick={evt => {
            evt.stopPropagation();
            setActiveTab(TABS.ATTRIBUTES);
          }}
        >
          <FormattedMessage defaultMessage="Company Profile" />
        </S.TabTitle>
      </S.Tabs>
      <S.WrapperContent hidden={activeTab !== TABS.DESCRIPTION}>
        <ProductDetailTab description={description} />
      </S.WrapperContent>
      <S.WrapperContent hidden={activeTab !== TABS.ATTRIBUTES}>
        {/* <S.AttributeList> */}
        {/* {attributes &&
            attributes.map((attribute, index) => (
              <li key={index}>
                <S.AttributeName>{attribute.attribute.name}: </S.AttributeName>{" "}
                {attribute.values.map(value => value.name).join(", ")}
              </li>
              ))} */}
        <CompanyProfile store={store} />
        {/* </S.AttributeList> */}
      </S.WrapperContent>
    </S.Wrapper>
  );
};
