import React from "react";

import { Icon } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductListHeader: React.FC<IProps> = ({
  numberOfProducts = 0,
  openFiltersMenu,
  clearFilters,
  activeFilters = 0,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.LeftSide>
        <S.FiltersSection onClick={openFiltersMenu}>
          <Icon name="filter" size={24} />
          <S.Filters>
            FILTERS{" "}
            {activeFilters > 0 && (
              <>
                <span>({activeFilters})</span>
              </>
            )}
          </S.Filters>
        </S.FiltersSection>
        {activeFilters > 0 && (
          <S.Clear onClick={clearFilters}>CLEAR FILTERS</S.Clear>
        )}
      </S.LeftSide>

      <div>
        <S.Element>
          <S.Label>Products found: </S.Label> {numberOfProducts}
        </S.Element>
        <S.Element>
          <S.Label>Sort by:</S.Label>
        </S.Element>
      </div>
    </S.Wrapper>
  );
};
