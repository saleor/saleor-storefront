import React from "react";

import { ButtonLink } from "@components/atoms";

import { IFilters, ISingleFilterAttribute } from "../../../types";
import * as S from "./styles";
import { IProps } from "./types";

const ENTER_KEY: number = 13;
const SPACE_KEY: number = 32;

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
          const ref = React.useRef<HTMLDivElement>(null);

          if (!viewAllOptions && index > filtersLimit - 1) {
            return <></>;
          } else {
            return (
              <S.Checkbox
                ref={ref}
                onClick={evt => {
                  evt.preventDefault();
                  onAttributeFiltersChange(slug, value.slug);
                  if (ref.current) {
                    ref.current.blur();
                  }
                }}
              >
                <S.Label>
                  <input
                    tabIndex={-1}
                    type="checkbox"
                    name={slug}
                    checked={checkIfAttributeIsChecked(filters, value, slug)}
                    readOnly
                  />
                  <div
                    ref={ref}
                    tabIndex={0}
                    onKeyDown={evt => {
                      if (evt.which === SPACE_KEY || evt.which === ENTER_KEY) {
                        onAttributeFiltersChange(slug, value.slug);
                        evt.preventDefault();
                      }
                    }}
                  >
                    <span></span>
                  </div>
                </S.Label>
                {value && value.name}
              </S.Checkbox>
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
