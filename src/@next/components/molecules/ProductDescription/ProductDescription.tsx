import React from "react";
import { FormattedMessage } from "react-intl";

import { RichTextEditorContent } from "@components/atoms";

import { CompanyProfile } from "./CompanyProfile";
import * as S from "./styles";
import { IProps } from "./types";

enum TABS {
  DESCRIPTION = "DESCRIPION",
  ATTRIBUTES = "ATTRIBUTES",
}

export const ProductDescription: React.FC<IProps> = ({
  description,
  attributes,
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
      <div hidden={activeTab !== TABS.DESCRIPTION}>
        <RichTextEditorContent jsonData={description} />
      </div>
      <div hidden={activeTab !== TABS.ATTRIBUTES}>
        {/* <S.AttributeList> */}
        {/* {attributes &&
            attributes.map((attribute, index) => (
              <li key={index}>
                <S.AttributeName>{attribute.attribute.name}: </S.AttributeName>{" "}
                {attribute.values.map(value => value.name).join(", ")}
              </li>
              ))} */}
        <CompanyProfile attributes={attributes} />
        {/* </S.AttributeList> */}
      </div>
    </S.Wrapper>
  );
};
