import React from "react";
import { FormattedMessage } from "react-intl";

import { Chip, DropdownSelect, Icon } from "@components/atoms";
import { commonMessages } from "@temp/intl";

import * as S from "./styles";
import { IProps } from "./types";

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
  return (
    <S.Wrapper>
      <S.Bar>
        <S.LeftSide>
          <S.FiltersButton onClick={openFiltersMenu} data-test="filtersButton">
            <Icon name="filter" size={24} />
            <S.Filters>
              <FormattedMessage {...commonMessages.filterHeader} />{" "}
              {activeFilters > 0 && (
                <>
                  <span>({activeFilters})</span>
                </>
              )}
            </S.Filters>
          </S.FiltersButton>
          {activeFilters > 0 && (
            <S.Clear onClick={clearFilters} data-test="clearFiltersButton">
              <FormattedMessage {...commonMessages.clearFilterHeader} />
            </S.Clear>
          )}
        </S.LeftSide>

        <S.RightSide>
          <S.Element data-test="productsFoundCounter">
            <S.Label>
              <FormattedMessage defaultMessage="Products found:" />{" "}
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
          ({ attributeSlug, valueName, valueSlug }) => (
            <Chip
              onClose={() => onCloseFilterAttribute(attributeSlug, valueSlug)}
            >
              {valueName}
            </Chip>
          )
        )}
      </S.FiltersChipsWrapper>
    </S.Wrapper>
  );
};
