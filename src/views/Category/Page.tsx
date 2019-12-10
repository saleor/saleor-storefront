import "../Category/scss/index.scss";

import * as React from "react";

import { IFilterAttributes, IFilters } from "@types";
import {
  Breadcrumbs,
  extractBreadcrumbs,
  ProductsFeatured,
  ProductsList,
  ProductsListCollections
} from "../../components";

import { ProductListHeader } from "../../@next/components/molecules";
import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";
import { maybe } from "../../core/utils";
import { Category_category, Category_products } from "./types/Category";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  category: Category_category;
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  products: Category_products;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
}

const Page: React.FC<PageProps> = ({
  activeFilters,
  activeSortOption,
  attributes,
  category,
  displayLoader,
  hasNextPage,
  clearFilters,
  onLoadMore,
  products,
  filters,
  onOrder,
  sortOptions,
  onAttributeFiltersChange,
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  const hasProducts = canDisplayProducts && !!products.totalCount;
  const [showFilters, setShowFilters] = React.useState(false);

  const catCheck = maybe(
    () => category.id === "Q2F0ZWdvcnk6MzE="
  );
  return (
    <div className="category">
      <div
        className="category__header"
        style={
          category.backgroundImage
            ? { backgroundImage: `url(${category.backgroundImage.url})` }
            : undefined
        }
      >
        <span className="category__header__title">
          <h1>{category.name}</h1>
        </span>
      </div>
      <div className="container">
        <Breadcrumbs breadcrumbs={extractBreadcrumbs(category)} />
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
          numberOfProducts={products ? products.totalCount : 0}
          activeFilters={activeFilters}
          clearFilters={clearFilters}
          sortOptions={sortOptions}
          onChange={onOrder}
        />
      </div>

      {catCheck && canDisplayProducts ?
          <>
            <ProductsListCollections
              displayLoader={displayLoader}
              hasNextPage={hasNextPage}
              onLoadMore={onLoadMore}
              products={products.edges.map(edge => edge.node)}
              totalCount={products.totalCount}
            />
          </> :
          <>
            <ProductsList
              displayLoader={displayLoader}
              hasNextPage={hasNextPage}
              onLoadMore={onLoadMore}
              products={products.edges.map(edge => edge.node)}
              totalCount={products.totalCount}
            />
          </>
      }

      {!hasProducts && <ProductsFeatured title="You might like" />}
    </div>
  );
};

export default Page;
