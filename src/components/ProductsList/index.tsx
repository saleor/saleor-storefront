import * as React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Dropdown,
  PriceRangeFilter,
  ProductListItem,
  SelectField
} from "..";
import {
  CategoryAttributesInterface,
  CategoryProductInterface
} from "../../core/types";
import { generateProductUrl } from "../../core/utils";
import { SelectValue } from "../SelectField";

import "./scss/index.scss";

export interface Filters {
  attributes: {
    [attributeSlug: string]: string[];
  };
  pageSize: number;
  sortBy: string;
  priceLte: number;
  priceGte: number;
}

interface ProductsListProps {
  attributes: CategoryAttributesInterface[];
  filters: Filters;
  hasNextPage: boolean;
  products: CategoryProductInterface;
  onPriceChange: (field: "priceLte" | "priceGte", value: number) => void;
  onAttributeFiltersChange: (attributeSlug: string, values: string[]) => void;
  onOrder: (order: string) => void;
}

export const ProductList: React.SFC<ProductsListProps> = ({
  attributes,
  filters,
  hasNextPage,
  products,
  onAttributeFiltersChange,
  onPriceChange,
  onOrder
}) => {
  const filterOptions = [
    { value: "price", label: "Price Low-High" },
    { value: "-price", label: "Price High-Low" },
    { value: "name", label: "Name Increasing" },
    { value: "-name", label: "Name Decreasing" }
  ];

  return (
    <div className="products-list">
      <div className="products-list__filters">
        <div className="container">
          <div className="products-list__filters__grid">
            {attributes.map(attribute => (
              <div
                key={attribute.id}
                className="products-list__filters__grid__filter"
              >
                <SelectField
                  value={
                    filters.attributes[attribute.slug]
                      ? filters.attributes[attribute.slug].map(
                          attributeValueSlug => {
                            const attributeValue = attribute.values.find(
                              attributeValue =>
                                attributeValue.slug === attributeValueSlug
                            );
                            return {
                              label: attributeValue.name,
                              value: attributeValue.slug
                            };
                          }
                        )
                      : []
                  }
                  placeholder={attribute.name}
                  options={attribute.values.map(attributeValue => ({
                    label: attributeValue.name,
                    value: attributeValue.slug
                  }))}
                  isMulti
                  onChange={(values: SelectValue[]) =>
                    onAttributeFiltersChange(
                      attribute.slug,
                      values.map(value => value.value)
                    )
                  }
                />
              </div>
            ))}
            <div className="products-list__filters__grid__filter">
              <PriceRangeFilter
                from={filters.priceGte}
                to={filters.priceLte}
                onChange={onPriceChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="products-list__products container">
        <div className="products-list__products__subheader">
          <span className="products-list__products__subheader__total">
            {products.totalCount} Products
          </span>
          <span className="products-list__products__subheader__sort">
            <span>Sort by:</span>{" "}
            <Dropdown
              options={filterOptions}
              value={
                filterOptions.find(option => option.value === filters.sortBy) ||
                ""
              }
              isSearchable={false}
              onChange={event => onOrder(event.value)}
            />
          </span>
        </div>
        {products.edges.length > 0 ? (
          <>
            <div className="products-list__products__grid">
              {products.edges.map(({ node: product }) => (
                <Link
                  to={generateProductUrl(product.id, product.name)}
                  key={product.id}
                >
                  <ProductListItem product={product} />
                </Link>
              ))}
            </div>
            <div className="products-list__products__load-more">
              {hasNextPage && (
                <Button secondary onClick={this.loadMoreProducts}>
                  Load more products
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="products-list__products-not-found">
            We couldn't find any product matching these conditions
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
