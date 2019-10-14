import React from "react";

import { ButtonLink } from "@components/atoms";

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
  onAttributeFiltersChange,
}: IProps) => {
  const [viewAllOptions, setViewAllOptions] = React.useState(false);
  return (
    <S.Wrapper>
      <S.Header>{name}</S.Header>
      {values &&
        values.map((value, index) => {
          const ref = React.useRef<HTMLDivElement>(null);

          if (!viewAllOptions && index > 4) {
            return <></>;
          } else {
            return (
              <S.Checkbox>
                {value && value.name}
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
                      if (evt.which === 32 || evt.which === 13) {
                        onAttributeFiltersChange(slug, value.slug);
                        evt.preventDefault();
                      }
                    }}
                    onClick={evt => {
                      evt.preventDefault();
                      onAttributeFiltersChange(slug, value.slug);
                      if (ref.current) {
                        ref.current.blur();
                      }
                    }}
                  >
                    <span></span>
                  </div>
                </S.Label>
              </S.Checkbox>
            );
          }
        })}
      {!viewAllOptions && values.length > 5 && (
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
