import "../Collection/scss/custom_index.scss";

import * as React from "react";

import {
  Filters,
  ProductsFeatured,
  ProductsList
} from "../../components";
import { maybe } from "../../core/utils";
import {
  Collection_attributes_edges_node,
  Collection_collection,
  Collection_products
} from "./types/Collection";

interface PageProps {
  attributes: Collection_attributes_edges_node[];
  collection: Collection_collection;
  displayLoader: boolean;
  filters: Filters;
  hasNextPage: boolean;
  products: Collection_products;
  onLoadMore: () => void;
  onPriceChange: (field: "priceLte" | "priceGte", value: number) => void;
  onAttributeFiltersChange: (attributeSlug: string, values: string[]) => void;
  onOrder: (order: string) => void;
}

export const Page: React.FC<PageProps> = ({
  attributes,
  collection,
  displayLoader,
  filters,
  hasNextPage,
  onLoadMore,
  products,
  onAttributeFiltersChange,
  onPriceChange,
  onOrder,
}) => {
  const canDisplayProducts = maybe(
    () => products.edges && products.totalCount !== undefined,
    false
  );
  const hasProducts = canDisplayProducts && !!products.totalCount;

  return (
    <div className="collection">
      <div
        className="collection__header"
        style={
          collection.backgroundImage
            ? { backgroundImage: `url(${collection.backgroundImage.url})` }
            : undefined
        }
      >
        <span className="collection__header__title">
          <h1>{collection.name}</h1>
        </span>
        <div className="collection__description">
          <h2>{collection.seoDescription}</h2>
        </div>
      </div>

      {canDisplayProducts && (
        <ProductsList
          displayLoader={displayLoader}
          hasNextPage={hasNextPage}
          onLoadMore={onLoadMore}
          products={products.edges.map(edge => edge.node)}
          totalCount={products.totalCount}
        />
      )}
      {!hasProducts && <ProductsFeatured title="You might like" />}
      <div
        className="collection__footer"
        style={
          collection.backgroundImage
            ? { backgroundImage: `url(${collection.backgroundImage.url})` }
            : undefined
        }
      >
        <span className="collection__footer__title">
          <h1>{collection.name}</h1>
        </span>
        <div className="collection__footer__booknow">
          <button className="button primary ">
            <span>Book Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
