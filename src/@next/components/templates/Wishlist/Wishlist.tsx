import React from "react";

import { ProductListHeader } from "@components/molecules";
import { FilterSidebar, ProductList } from "@components/organisms";

import * as S from "./styles";
import { IProps } from "./types";

export const Wishlist: React.FC<IProps> = ({
  wishlist,
  filtering,
  sorting,
  filterSidebarTarget,
}: IProps) => {
  const {
    filters,
    filterAttributes,
    activeFilters,
    clearFilters,
    onAttributeFiltersChange,
  } = filtering;
  const { sortOptions, activeSortOption, onOrder } = sorting;

  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <S.Wrapper>
      <FilterSidebar
        show={showFilters}
        hide={() => setShowFilters(false)}
        onAttributeFiltersChange={onAttributeFiltersChange}
        attributes={filterAttributes}
        filters={filters}
        target={filterSidebarTarget}
      />
      <ProductListHeader
        activeSortOption={activeSortOption}
        openFiltersMenu={() => setShowFilters(true)}
        numberOfProducts={wishlist ? wishlist.length : 0}
        activeFilters={activeFilters}
        clearFilters={clearFilters}
        sortOptions={sortOptions}
        onChange={onOrder}
      />
      <ProductList
        products={wishlist ? wishlist.map(({ product }) => product) : []}
        loading={false}
        onLoadMore={() => null}
      />
    </S.Wrapper>
  );
};
