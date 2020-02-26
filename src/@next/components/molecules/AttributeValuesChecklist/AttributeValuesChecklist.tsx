import React from "react";

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
  const [valuesHidden, setValuesHidden] = React.useState(
    valuesShowLimit && values.length > valuesShowLimitNumber
  );

  const visibleValues = valuesHidden
    ? values.slice(0, valuesShowLimitNumber)
    : values;

  return (
    <S.Wrapper>
      {title && <S.Header>{title}</S.Header>}
      {visibleValues &&
        visibleValues.map(value => (
          <Checkbox
            key={value.slug}
            name={name}
            checked={!!value.selected}
            onChange={() => onValueClick(value)}
          >
            {value && value.name}
          </Checkbox>
        ))}
      {valuesHidden && (
        <S.ViewMoreButton>
          <ButtonLink
            size="sm"
            color="secondary"
            onClick={() => setValuesHidden(false)}
          >
            VIEW ALL OPTIONS
          </ButtonLink>
        </S.ViewMoreButton>
      )}
      <S.BottomBorder />
    </S.Wrapper>
  );
};
