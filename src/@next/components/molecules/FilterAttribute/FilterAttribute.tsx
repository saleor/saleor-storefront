import React from "react";

import { ButtonLink, Checkbox } from "@components/atoms";

import { IFilters, ISingleFilterAttribute } from "../../../types";
import * as S from "./styles";
import { IProps } from "./types";

const checkIfAttributeIsChecked = (
  filters: IFilters,
  value: ISingleFilterAttribute,
  slug: string
) => {
  if (filters!.attributes && filters.attributes.hasOwnProperty(slug)) {
    if (filters.attributes[slug].find(filter => filter === value.slug)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const FilterAttribute: React.FC<IProps> = ({
  attribute: { name, slug, values },
  filters,
  filtersLimit = 5,
  onAttributeFiltersChange,
}: IProps) => {
  const [viewAllOptions, setViewAllOptions] = React.useState(false);
  return (
    <S.Wrapper>
      <S.Header>{name}</S.Header>
      {values &&
        values.map((value, index) => {
          if (!viewAllOptions && index > filtersLimit - 1) {
            return <></>;
          } else {
            return (
              <Checkbox
                name={slug}
                checked={checkIfAttributeIsChecked(filters, value, slug)}
                onChange={() => onAttributeFiltersChange(slug, value.slug)}
              >
                {value && value.name}
              </Checkbox>
            );
          }
        })}
      {!viewAllOptions && values.length > filtersLimit && (
        <S.ViewMoreButton>
          <ButtonLink
            size="sm"
            color="secondary"
            onClick={() => setViewAllOptions(true)}
          >
            VIEW ALL OPTIONS
          </ButtonLink>
        </S.ViewMoreButton>
      )}
      <S.BottomBorder />
    </S.Wrapper>
  );
};
