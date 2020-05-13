import React from "react";

import { RichTextContent } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

import { useIntl } from "react-intl"

enum TABS {
  DESCRIPTION,
  ATTRIBUTES,
}

export const ProductDescription: React.FC<IProps> = ({
  description = "",
  descriptionJson = "",
  attributes,
}: IProps) => {
  const intl = useIntl();

  const [activeTab, setActiveTab] = React.useState<TABS>(TABS.DESCRIPTION);

  return (
    <S.Wrapper>
      <S.Tabs>
        <S.TabTitle
          active={activeTab === TABS.DESCRIPTION}
          onMouseEnter={evt => {
            evt.stopPropagation();
            setActiveTab(TABS.DESCRIPTION);
          }}
          onClick={evt => {
            evt.stopPropagation();
            setActiveTab(TABS.DESCRIPTION);
          }}
        >
          {
            intl.formatMessage({
            defaultMessage: "DESCRIPTION",
            })
          }
          
        </S.TabTitle>
        <S.TabTitle
          active={activeTab === TABS.ATTRIBUTES}
          onMouseEnter={evt => {
            evt.stopPropagation();
            setActiveTab(TABS.ATTRIBUTES);
          }}
          onClick={evt => {
            evt.stopPropagation();
            setActiveTab(TABS.ATTRIBUTES);
          }}
        >
          {
            intl.formatMessage({
            defaultMessage: "ATTRIBUTES",
            })
          }
        
        </S.TabTitle>
      </S.Tabs>
      {activeTab === TABS.DESCRIPTION &&
        (descriptionJson ? (
          <RichTextContent descriptionJson={descriptionJson} />
        ) : (
          <p>{description}</p>
        ))}
      {activeTab === TABS.ATTRIBUTES && (
        <S.AttributeList>
          {attributes &&
            attributes.map((attribute, index) => (
              <li key={index}>
                <S.AttributeName>{attribute.attribute.translation?.name || attribute.attribute.name}: </S.AttributeName>{" "}
                {attribute.values.map(value => value.translation?.name || value.name).join(", ")}
              </li>
            ))}
        </S.AttributeList>
      )}
    </S.Wrapper>
  );
};
