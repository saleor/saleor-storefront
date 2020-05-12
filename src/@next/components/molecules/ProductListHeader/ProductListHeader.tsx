import React from "react";

import { Chip, DropdownSelect, Icon } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

import { useIntl } from "react-intl";

export const ProductListHeader: React.FC<IProps> = ({
  numberOfProducts = 0,
  openFiltersMenu,
  clearFilters,
  activeSortOption,
  activeFilters = 0,
  activeFiltersAttributes = [],
  sortOptions,
  onChange,
  onCloseFilterAttribute,
}: IProps) => {
  const intl = useIntl();

  return (
    <S.Wrapper>
      <S.Bar>
        <S.LeftSide>
          <S.FiltersButton onClick={openFiltersMenu} data-cy="filters__button">
            <Icon name="filter" size={24} />
            <S.Filters>
            {
              intl.formatMessage({
                defaultMessage: "FILTERS",
                description: "FILTERS title",
              })
            }{" "}
              {activeFilters > 0 && (
                <>
                  <span>({activeFilters})</span>
                </>
              )}
            </S.Filters>
          </S.FiltersButton>
          {activeFilters > 0 && (
            <S.Clear onClick={clearFilters}>
              {
                intl.formatMessage({
                  defaultMessage: "CLEAR FILTERS",
                  description: "CLEAR FILTERS button",
                })
              }
            </S.Clear>
          )}
        </S.LeftSide>

        <S.RightSide>
          <S.Element data-cy="no-of-products-found_label">
            <S.Label>
              {
                intl.formatMessage({
                  defaultMessage: "Products found: ",
                  description: "products found label",
                })
              }
            </S.Label>
            {numberOfProducts}
          </S.Element>
          <S.Element>
            <S.Sort>
              <DropdownSelect
                onChange={onChange}
                options={sortOptions}
                value={sortOptions.find(
                  option => option.value === activeSortOption
                )}
              />
            </S.Sort>
          </S.Element>
        </S.RightSide>
      </S.Bar>
      <S.FiltersChipsWrapper>
        {activeFiltersAttributes.map(
          ({ attributeSlug, valueName, valueSlug, valueNameTranslation }) => (
            <Chip
              onClose={() => onCloseFilterAttribute(attributeSlug, valueSlug)}
            >
              {valueNameTranslation || valueName}
            </Chip>
          )
        )}
      </S.FiltersChipsWrapper>
    </S.Wrapper>
  );
};
