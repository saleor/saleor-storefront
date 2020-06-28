import React from "react";
import { FormattedMessage } from "react-intl";

import { ButtonLink, Checkbox } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const AttributeValuesChecklist: React.FC<IProps> = ({
  title,
  name,
  values,
  valuesShowLimit = false,
  valuesShowLimitNumber = 5,
  onValueClick,
}: IProps) => {
  const [viewAllOptions, setViewAllOptions] = React.useState(!valuesShowLimit);

  return (
    <S.Wrapper>
      {title && <S.Header>{title}</S.Header>}
      {values &&
        values.map((value, index) => {
          if (!viewAllOptions && index > valuesShowLimitNumber - 1) {
            return <></>;
          }
          return (
            <Checkbox
              name={name}
              checked={!!value.selected}
              onChange={() => onValueClick(value)}
            >
              {value && value.name}
            </Checkbox>
          );
        })}
      {!viewAllOptions && values.length > valuesShowLimitNumber && (
        <S.ViewMoreButton>
          <ButtonLink
            testingContext="viewAllButton"
            size="sm"
            color="secondary"
            onClick={() => setViewAllOptions(true)}
          >
            <FormattedMessage defaultMessage="VIEW ALL OPTIONS" />
          </ButtonLink>
        </S.ViewMoreButton>
      )}
      <S.BottomBorder />
    </S.Wrapper>
  );
};
