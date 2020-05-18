import "../Category/scss/index.scss";

import * as React from "react";

import { IFilterAttributes, IFilters } from "@types";
import { ProductListHeader } from "../../@next/components/molecules";
import { ProductList } from "../../@next/components/organisms";
import { Breadcrumbs, ProductsFeatured } from "../../components";
import { getDBIdFromGraphqlId, maybe } from "../../core/utils";

import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";
import {
  Collection_collection,
  Collection_products,
} from "./gqlTypes/Collection";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  collection: Collection_collection;
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  products: Collection_products;
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
  collection,
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

  const breadcrumbs = [
    {
      link: [
        `/collection`,
        `/${collection.slug}`,
        `/${getDBIdFromGraphqlId(collection.id, "Collection")}/`,
      ].join(""),
      value: collection.name,
    },
  ];

  const getAttribute = (attributeSlug: string, valueSlug: string) => {
    return {
      attributeSlug,
      valueName: attributes
        .find(({ slug }) => attributeSlug === slug)
        .values.find(({ slug }) => valueSlug === slug).name,
      valueSlug,
    };
  };

  const activeFiltersAttributes =
    filters &&
    filters.attributes &&
    Object.keys(filters.attributes).reduce(
      (acc, key) =>
        acc.concat(
          filters.attributes[key].map(valueSlug => getAttribute(key, valueSlug))
        ),
      []
    );

  return (
    <div className="collection">
      <div className="container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
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
          activeFiltersAttributes={activeFiltersAttributes}
          clearFilters={clearFilters}
          sortOptions={sortOptions}
          onChange={onOrder}
          onCloseFilterAttribute={onAttributeFiltersChange}
        />
        {canDisplayProducts && (
          <ProductList
            products={products.edges.map(edge => edge.node)}
            canLoadMore={hasNextPage}
            loading={displayLoader}
            onLoadMore={onLoadMore}
          />
        )}
      </div>

      {!hasProducts && <ProductsFeatured title="You might like" />}
    </div>
  );
};

export default Page;
