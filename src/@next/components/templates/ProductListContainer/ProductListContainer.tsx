import React from "react";

import { LoadingListAdapter, ProductListHeader } from "@components/molecules";
import { FilterSidebar, ProductList } from "@components/organisms";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductListContainer: React.FC<IProps> = ({
  activeFilters,
  activeSortOption,
  attributes,
  clearFilters,
  canLoadMore,
  onLoadMore,
  loadMoreText,
  products,
  loading,
  filters,
  onOrder,
  sortOptions,
  onAttributeFiltersChange,
}: IProps) => {
  const canDisplayProducts = !!products.edges && !!products.totalCount;
  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <S.Wrapper>
      <FilterSidebar
        show={showFilters}
        hide={() => setShowFilters(false)}
        onAttributeFiltersChange={onAttributeFiltersChange}
        attributes={attributes}
        filters={filters}
      />
      <ProductListHeader
        activeSortOption={activeSortOption}
        openFiltersMenu={() => setShowFilters(true)}
        numberOfProducts={products.totalCount ? products.totalCount : 0}
        activeFilters={activeFilters}
        clearFilters={clearFilters}
        sortOptions={sortOptions}
        onChange={onOrder}
      />
      <LoadingListAdapter
        loading={loading}
        canLoadMore={canLoadMore}
        onLoadMore={onLoadMore}
        loadMoreText={loadMoreText}
      >
        {canDisplayProducts && (
          <ProductList
            products={products.edges.map(edge => edge.node)}
            totalCount={products.totalCount ? products.totalCount : 0}
          />
        )}
      </LoadingListAdapter>
    </S.Wrapper>
  );
};
