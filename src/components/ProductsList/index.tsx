import * as React from "react";
import Media from "react-media";
import { Link } from "react-router-dom";

import { Button, Dropdown, ProductListItem } from "..";
import { CategoryProductInterface } from "../../core/types";
import { generateProductUrl } from "../../core/utils";
import Loader from "../Loader";
import { Filters } from "../ProductFilters";

import "./scss/index.scss";
import { mediumScreen, smallScreen } from "../App/scss/variables.scss";

interface ProductsListProps {
  displayLoader: boolean;
  hasNextPage: boolean;
  filters: Filters;
  onLoadMore: () => void;
  products: CategoryProductInterface;
  onOrder: (order: string) => void;
  notFoundPhrase?: string;
}

export const ProductList: React.SFC<ProductsListProps> = ({
  displayLoader,
  filters,
  hasNextPage,
  onLoadMore,
  products,
  onOrder,
  notFoundPhrase
}) => {
  const filterOptions = [
    { value: "price", label: "Price Low-High" },
    { value: "-price", label: "Price High-Low" },
    { value: "name", label: "Name Increasing" },
    { value: "-name", label: "Name Decreasing" }
  ];
  const sortValues = filterOptions.find(
    option => option.value === filters.sortBy
  );
  const hasProducts = !!products.totalCount;
  displayLoader = true;
  return (
    <div className="products-list">
      <div className="products-list__products container">
        <div className="products-list__products__subheader">
          <span className="products-list__products__subheader__total">
            {products.totalCount} Products
          </span>
          {displayLoader && (
            <div className="products-list__loader">
              <Loader />
            </div>
          )}
          <span className="products-list__products__subheader__sort">
            {hasProducts && (
              <>
                <span>Sort by:</span>{" "}
                <Dropdown
                  options={filterOptions}
                  value={sortValues || ""}
                  isSearchable={false}
                  onChange={event => onOrder(event.value)}
                />
              </>
            )}
          </span>
        </div>
        {hasProducts ? (
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
              {displayLoader ? (
                <Loader />
              ) : (
                hasNextPage && (
                  <Button secondary onClick={onLoadMore}>
                    Load more products
                  </Button>
                )
              )}
            </div>
          </>
        ) : (
          <div className="products-list__products-not-found">
            {notFoundPhrase}
          </div>
        )}
      </div>
    </div>
  );
};

ProductList.defaultProps = {
  notFoundPhrase: "We couldn't find any product matching these conditions"
};

export default ProductList;
