import React from "react";

import { ButtonLink } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

const checkIfAttributeIsChecked = (filters, attribute, slug) => {
  if (filters.attributes && filters.attributes.hasOwnProperty(slug)) {
    if (filters.attributes[slug].find(filter => filter === attribute.slug)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const FilterAttribute: React.FC<IProps> = ({
  name,
  slug,
  values,
  onAttributeFiltersChange,
  filters,
}: IProps) => {
  const [viewAllOptions, setViewAllOptions] = React.useState(false);
  return (
    <S.Wrapper>
      <S.Header>{name}</S.Header>
      {values.map((value, index) => {
        const ref = React.useRef<HTMLDivElement>(null);

        const isChecked = checkIfAttributeIsChecked(filters, value, slug);
        if (!viewAllOptions && index > 4) {
          <></>;
        } else {
          return (
            <S.Checkbox>
              {value.name}
              <S.Label>
                <input
                  tabIndex={-1}
                  type="checkbox"
                  name={value.slug}
                  checked={isChecked}
                  onChange={evt => {
                    evt;
                  }}
                />
                <div
                  ref={ref}
                  tabIndex={0}
                  onKeyDown={evt => {
                    if (evt.which === 32 || evt.which === 13) {
                      evt.preventDefault();
                      onAttributeFiltersChange(slug, value.value);
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
        <ButtonLink
          size="sm"
          color="secondary"
          onClick={() => setViewAllOptions(true)}
        >
          VIEW ALL OPTIONS
        </ButtonLink>
      )}
      <S.BottomBorder />
    </S.Wrapper>
  );
};
