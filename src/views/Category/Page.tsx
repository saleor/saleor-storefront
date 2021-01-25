import { BaseCategory } from "@saleor/sdk/lib/fragments/gqlTypes/BaseCategory";
import { CategoryDetails } from "@saleor/sdk/lib/fragments/gqlTypes/CategoryDetails";
import { ProductDetails } from "@saleor/sdk/lib/fragments/gqlTypes/ProductDetails";
import * as React from "react";
import { useIntl } from "react-intl";

import { ProductListHeader } from "@components/molecules";
import { FilterSidebar, ProductList } from "@components/organisms";
import { Attribute } from "@graphql/gqlTypes/Attribute";
import { FeaturedProduct } from "@graphql/gqlTypes/FeaturedProduct";
import { commonMessages } from "@temp/intl";
import { SortOptions } from "@utils/collections";

import {
  Breadcrumbs,
  extractBreadcrumbs,
  Filters,
  ProductsFeatured,
} from "../../components";

import "./scss/index.scss";

export interface CategoryData {
  details: CategoryDetails;
  ancestors: BaseCategory[];
  attributes: Attribute[];
  products: ProductDetails[];
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
  sortOptions: SortOptions;
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
  sortOptions,
  onAttributeFiltersChange,
}) => {
  const hasProducts = numberOfProducts > 0;
  const [showFilters, setShowFilters] = React.useState(false);
  const intl = useIntl();

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
          activeFiltersAttributes={activeFiltersAttributes}
          clearFilters={clearFilters}
          sortOptions={sortOptions}
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
