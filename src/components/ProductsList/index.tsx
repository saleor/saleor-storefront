import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";

import { Button, ProductListItem } from "..";
import { generateProductUrl } from "../../core/utils";
import Loader from "../Loader";
import { Filters } from "../ProductFilters";

import { Product } from "../ProductListItem";

interface ProductsListProps {
  displayLoader: boolean;
  filters: Filters;
  hasNextPage: boolean;
  notFound?: string | React.ReactNode;
  onLoadMore: () => void;
  onOrder: (order: string) => void;
  products: Product[];
  totalCount: number;
}

export const ProductList: React.FC<ProductsListProps> = ({
  displayLoader,
  filters,
  hasNextPage,
  notFound,
  onLoadMore,
  onOrder,
  products,
  totalCount,
}) => {
  const hasProducts = !!totalCount;

  return (
    <div className="products-list">
      <div className="products-list__products container">
        {hasProducts ? (
          <>
            <div className="products-list__products__grid">
              {products.map(product => (
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
          <div className="products-list__products-not-found">{notFound}</div>
        )}
      </div>
    </div>
  );
};

ProductList.defaultProps = {
  notFound: "We couldn't find any product matching these conditions",
};

export default ProductList;
