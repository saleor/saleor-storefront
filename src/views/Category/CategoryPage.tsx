import "./scss/index.scss";

import * as React from "react";

import { Breadcrumbs, ProductsList } from "../../components";
import { Filters, ProductFilters } from "../../components/ProductFilters";
import {
  Category_attributes_edges_node,
  Category_category,
  Category_products
} from "../../core/types/saleor";
import { getDBIdFromGraphqlId, slugify } from "../../core/utils";

interface CategoryPageProps {
  attributes: Category_attributes_edges_node[];
  category: Category_category;
  displayLoader: boolean;
  filters: Filters;
  hasNextPage: boolean;
  products: Category_products;
  onLoadMore: () => void;
  onPriceChange: (field: "priceLte" | "priceGte", value: number) => void;
  onAttributeFiltersChange: (attributeSlug: string, values: string[]) => void;
  onOrder: (order: string) => void;
}

const formatBreadcrumbs = (category: Category_category) => {
  let breadcrumbs = [
    {
      link: `/category/${slugify(category.name)}/${getDBIdFromGraphqlId(
        category.id,
        "Category"
      )}/`,
      value: category.name
    }
  ];
  if (category.ancestors.edges.length > 0) {
    const ancestorsList = category.ancestors.edges.map(
      ({ node: ancestor }) => ({
        link: `/category/${slugify(ancestor.name)}/${getDBIdFromGraphqlId(
          ancestor.id,
          "Category"
        )}/`,
        value: ancestor.name
      })
    );
    breadcrumbs = ancestorsList.concat(breadcrumbs);
  }
  return breadcrumbs;
};

export const CategoryPage: React.SFC<CategoryPageProps> = ({
  attributes,
  category,
  displayLoader,
  filters,
  hasNextPage,
  onLoadMore,
  products,
  onAttributeFiltersChange,
  onPriceChange,
  onOrder
}) => {
  const canDisplayProducts =
    products &&
    products.edges !== undefined &&
    products.totalCount !== undefined;
  return (
    <div className="category">
      <div
        className="category__header"
        style={
          category.backgroundImage
            ? {
                backgroundImage: `url(${category.backgroundImage.url})`
              }
            : undefined
        }
      >
        <span className="category__header__title">
          <h1>{category.name}</h1>
        </span>
      </div>
      <div className="container">
        <Breadcrumbs breadcrumbs={formatBreadcrumbs(category)} />
      </div>
      <ProductFilters
        filters={filters}
        attributes={attributes}
        onAttributeFiltersChange={onAttributeFiltersChange}
        onPriceChange={onPriceChange}
      />
      {canDisplayProducts && (
        <ProductsList
          displayLoader={displayLoader}
          filters={filters}
          hasNextPage={hasNextPage}
          onLoadMore={onLoadMore}
          onOrder={onOrder}
          products={products}
        />
      )}
    </div>
  );
};
