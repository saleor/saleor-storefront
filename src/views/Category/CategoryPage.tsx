import "./scss/index.scss";

import * as React from "react";

import { Breadcrumbs, ProductsList } from "../../components";
import { Filters } from "../../components/ProductsList";
import {
  Category_attributes,
  Category_category,
  Category_products
} from "../../core/types/saleor";
import { getDBIdFromGraphqlId, slugify } from "../../core/utils";

interface CategoryPageProps {
  attributes: Category_attributes;
  category: Category_category;
  filters: Filters;
  hasNextPage: boolean;
  products: Category_products;
  onFiltersChange: (filters: Filters) => void;
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
  filters,
  hasNextPage,
  products,
  onFiltersChange
}) => (
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
    <ProductsList
      products={products}
      hasNextPage={hasNextPage}
      filters={filters}
      attributes={attributes.edges.map(edge => edge.node)}
      onFiltersChange={onFiltersChange}
    />
  </div>
);
