import { BaseCategory } from "@saleor/sdk/lib/fragments/gqlTypes/BaseCategory";
import { CategoryDetails } from "@saleor/sdk/lib/fragments/gqlTypes/CategoryDetails";
import { ProductDetails } from "@saleor/sdk/lib/fragments/gqlTypes/ProductDetails";
import { ProductList_products_edges_node } from "@saleor/sdk/lib/queries/gqlTypes/ProductList";
import * as React from "react";
import { useIntl } from "react-intl";

import { ProductListHeader } from "@components/molecules";
import { FilterSidebar, ProductList } from "@components/organisms";
import { Attribute } from "@graphql/gqlTypes/Attribute";
import { FeaturedProduct } from "@graphql/gqlTypes/FeaturedProduct";
import { commonMessages } from "@temp/intl";
import { SORT_OPTIONS, SortOptions } from "@utils/collections";

import {
  Breadcrumbs,
  extractBreadcrumbs,
  Filters,
  ProductsFeatured,
} from "../../components";
import { getActiveFilterAttributes } from "./utils";

import "./scss/index.scss";

export interface CategoryData {
  details: CategoryDetails;
  ancestors: BaseCategory[];
  attributes: Attribute[];
  products: (ProductDetails | ProductList_products_edges_node)[];
  numberOfProducts: number;
  featuredProducts: FeaturedProduct[];
}

interface PageProps {
  category: CategoryData;
  activeFilters: number;
  activeSortOption: string;
  displayLoader: boolean;
  filters: Filters;
  hasNextPage: boolean;
  clearFilters: () => void;
  onLoadMore: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
}

export const Page: React.FC<PageProps> = ({
  activeFilters,
  activeSortOption,
  category: {
    attributes,
    details,
    ancestors,
    products,
    numberOfProducts,
    featuredProducts,
  },
  displayLoader,
  hasNextPage,
  clearFilters,
  onLoadMore,
  filters,
  onOrder,
  onAttributeFiltersChange,
}) => {
  const hasProducts = products.length > 0;
  const [showFilters, setShowFilters] = React.useState(false);
  const intl = useIntl();

  return (
    <div className="category">
      <div className="container">
        <Breadcrumbs breadcrumbs={extractBreadcrumbs(details, ancestors)} />
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
          sortOptions={SORT_OPTIONS}
          onChange={onOrder}
          onCloseFilterAttribute={onAttributeFiltersChange}
        />
        {hasProducts && (
          <ProductList
            products={products}
            canLoadMore={hasNextPage}
            loading={displayLoader}
            onLoadMore={onLoadMore}
          />
        )}
      </div>

      {!hasProducts && (
        <ProductsFeatured
          products={featuredProducts}
          title={intl.formatMessage(commonMessages.youMightLike)}
        />
      )}
    </div>
  );
};
