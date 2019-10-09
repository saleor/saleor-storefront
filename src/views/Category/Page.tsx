import "./scss/index.scss";

import * as React from "react";

import {
  Breadcrumbs,
  extractBreadcrumbs,
  ProductsFeatured,
  ProductsList
} from "../../components";
import { Filters } from "../../components/ProductFilters";

import { ProductListHeader } from "../../@next/components/molecules";
import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";
import { maybe } from "../../core/utils";
import {
  Category_attributes_edges_node,
  Category_category,
  Category_products
} from "./types/Category";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
  attributes: Category_attributes_edges_node[];
  category: Category_category;
  displayLoader: boolean;
  filters: Filters;
  hasNextPage: boolean;
  products: Category_products;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: () => void;
  onPriceChange: (field: "priceLte" | "priceGte", value: number) => void;
  onAttributeFiltersChange: (attributeSlug: string, values: string[]) => void;
  onOrder: (order: string) => void;
}

const Page: React.FC<PageProps> = ({
  attributes,
  category,
  displayLoader,
  filters,
  hasNextPage,
  clearFilters,
  onLoadMore,
  products,
  onAttributeFiltersChange,
  onOrder,
  sortOptions,
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  const hasProducts = canDisplayProducts && !!products.totalCount;
  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <div className="category">
      <div className="container">
        <Breadcrumbs breadcrumbs={extractBreadcrumbs(category)} />
        <FilterSidebar
          show={showFilters}
          hide={() => setShowFilters(false)}
          filters={filters}
          attributes={attributes}
          onAttributeFiltersChange={onAttributeFiltersChange}
        />
        <ProductListHeader
          activeSortOption={filters.sortBy}
          openFiltersMenu={() => setShowFilters(true)}
          numberOfProducts={products ? products.totalCount : 0}
          activeFilters={
            filters!.attributes ? Object.keys(filters!.attributes).length : 0
          }
          clearFilters={clearFilters}
          sortOptions={sortOptions}
          onChange={onOrder}
        />
      </div>

      {canDisplayProducts && (
        <>
          <ProductsList
            displayLoader={displayLoader}
            filters={filters}
            hasNextPage={hasNextPage}
            onLoadMore={onLoadMore}
            onOrder={onOrder}
            products={products.edges.map(edge => edge.node)}
            totalCount={products.totalCount}
          />
        </>
      )}
      {!hasProducts && <ProductsFeatured title="You might like" />}
    </div>
  );
};

export default Page;
