import * as React from "react";
import { useIntl } from "react-intl";

import { ProductListHeader } from "@components/molecules";
import { FilterSidebar, ProductList } from "@components/organisms";
import { Attribute } from "@graphql/gqlTypes/Attribute";
import { FeaturedProduct } from "@graphql/gqlTypes/FeaturedProduct";
import { commonMessages } from "@temp/intl";
import { IFilters } from "@types";
import { SortOptions } from "@utils/collections";

import { DebounceChange, ProductsFeatured, TextField } from "../../components";
import { maybe } from "../../core/utils";
import { SearchProducts_products } from "./gqlTypes/SearchProducts";

import "./scss/index.scss";

interface PageProps {
  activeFilters: number;
  attributes: Attribute[];
  activeSortOption: string;
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  featuredProducts: FeaturedProduct[];
  search?: string;
  setSearch?: (
    newValue: string,
    updateType?: "replace" | "replaceIn" | "push" | "pushIn"
  ) => void;
  products: SearchProducts_products;
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
  search,
  setSearch,
  displayLoader,
  hasNextPage,
  clearFilters,
  onLoadMore,
  products,
  filters,
  onOrder,
  sortOptions,
  onAttributeFiltersChange,
  featuredProducts,
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  const hasProducts = canDisplayProducts && !!products.totalCount;
  const [showFilters, setShowFilters] = React.useState(false);
  const intl = useIntl();

  const getAttribute = (attributeSlug: string, valueSlug: string) => {
    return {
      attributeSlug,
      valueName: attributes
        .find(({ slug }) => attributeSlug === slug)
        .choices.edges.map(({ node }) => node)
        .find(({ slug }) => valueSlug === slug).name,
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
      <div className="search-page">
        <div className="search-page__header">
          <div className="search-page__header__input container">
            <DebounceChange
              debounce={evt =>
                setSearch((evt.target.value as string).toLowerCase())
              }
              value={search}
              time={500}
            >
              {({ change, value }) => {
                return (
                  <TextField
                    autoFocus
                    label={intl.formatMessage({
                      defaultMessage: "Search term:",
                    })}
                    onChange={change}
                    value={value}
                  />
                );
              }}
            </DebounceChange>
          </div>
        </div>
      </div>
      <div className="container">
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

      {!hasProducts && (
        <ProductsFeatured
          products={featuredProducts}
          title={intl.formatMessage(commonMessages.youMightLike)}
        />
      )}
    </div>
  );
};

export default Page;
