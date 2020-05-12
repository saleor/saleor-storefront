import React from "react";

import { ButtonLink, Checkbox } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

import { useIntl } from "react-intl";

export const AttributeValuesChecklist: React.FC<IProps> = ({
  title,
  name,
  values,
  valuesShowLimit = false,
  valuesShowLimitNumber = 5,
  onValueClick,
}: IProps) => {
  const intl = useIntl();

  const [viewAllOptions, setViewAllOptions] = React.useState(!valuesShowLimit);

  return (
    <S.Wrapper>
      {title && <S.Header>{title}</S.Header>}
      {values &&
        values.map((value, index, translation) => {
          if (!viewAllOptions && index > valuesShowLimitNumber - 1) {
            return <></>;
          } else {
            return (
              <Checkbox
                name={name}
                checked={!!value.selected}
                onChange={() => onValueClick(value)}
              >
                {value && (value.translation?.name || value.name)}
              </Checkbox>
            );
          }
        })}
      {!viewAllOptions && values.length > valuesShowLimitNumber && (
        <S.ViewMoreButton>
          <ButtonLink
            size="sm"
            color="secondary"
            onClick={() => setViewAllOptions(true)}
          >
            {
              intl.formatMessage({
                defaultMessage: "VIEW ALL OPTIONS",
                description: "view all options button",
             })
            }
          </ButtonLink>
        </S.ViewMoreButton>
      )}
      <S.BottomBorder />
    </S.Wrapper>
  );
};
