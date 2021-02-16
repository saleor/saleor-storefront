import { CollectionDetails } from "@saleor/sdk/lib/fragments/gqlTypes/CollectionDetails";
import { ProductList_products_edges_node } from "@saleor/sdk/lib/queries/gqlTypes/ProductList";
import React, { useState } from "react";
import { useIntl } from "react-intl";

import { FilterSidebar, ProductList } from "@components/organisms";
import { Attribute } from "@graphql/gqlTypes/Attribute";
import { commonMessages } from "@temp/intl";
import { IFilters } from "@types";
import { SortOptions } from "@utils/collections";
import { FeaturedProducts } from "@utils/ssr";

import { ProductListHeader } from "../../@next/components/molecules";
import {
  Breadcrumbs,
  extractBreadcrumbs,
  ProductsFeatured,
} from "../../components";
import { getActiveFilterAttributes } from "../Category/utils";

import "../Category/scss/index.scss";

export interface CollectionData {
  details: CollectionDetails;
  attributes: Attribute[];
  featuredProducts: FeaturedProducts;
}

interface PageProps {
  activeFilters: number;
  activeSortOption: string;
  collection: CollectionData;
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  numberOfProducts: number;
  products: ProductList_products_edges_node[];
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
}

export const Page: React.FC<PageProps> = ({
  activeFilters,
  activeSortOption,
  collection: { details, attributes, featuredProducts },
  displayLoader,
  hasNextPage,
  clearFilters,
  onLoadMore,
  products,
  filters,
  onOrder,
  numberOfProducts,
  sortOptions,
  onAttributeFiltersChange,
}) => {
  const hasProducts = products.length > 0;
  const [showFilters, setShowFilters] = useState(false);
  const intl = useIntl();

  return (
    <div className="collection">
      <div className="container">
        <Breadcrumbs breadcrumbs={extractBreadcrumbs(details)} />
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
          numberOfProducts={numberOfProducts}
          activeFilters={activeFilters}
          activeFiltersAttributes={getActiveFilterAttributes(
            filters?.attributes,
            attributes
          )}
          clearFilters={clearFilters}
          sortOptions={sortOptions}
          onChange={onOrder}
          onCloseFilterAttribute={onAttributeFiltersChange}
        />

        <ProductList
          products={products}
          canLoadMore={hasNextPage}
          loading={displayLoader}
          onLoadMore={onLoadMore}
        />
      </div>

      {!displayLoader && !hasProducts && (
        <ProductsFeatured
          products={featuredProducts.products}
          title={intl.formatMessage(commonMessages.youMightLike)}
        />
      )}
    </div>
  );
};
