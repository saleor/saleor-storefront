import React from "react";

import { DropdownSelect, Icon } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductListHeader: React.FC<IProps> = ({
  numberOfProducts = 0,
  openFiltersMenu,
  clearFilters,
  activeSortOption,
  activeFilters = 0,
  sortOptions,
  onChange,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.LeftSide>
        <S.FiltersButton onClick={openFiltersMenu}>
          <Icon name="filter" size={24} />
          <S.Filters>
            FILTERS{" "}
            {activeFilters > 0 && (
              <>
                <span>({activeFilters})</span>
              </>
            )}
          </S.Filters>
        </S.FiltersButton>
        {activeFilters > 0 && (
          <S.Clear onClick={clearFilters}>CLEAR FILTERS</S.Clear>
        )}
      </S.LeftSide>

      <div>
        <S.Element>
          <S.Label>Products found: </S.Label> {numberOfProducts}
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
      </div>
    </S.Wrapper>
  );
};
