import "../Collection/scss/custom_index.scss";

import * as React from "react";

import { IFilterAttributes, IFilters } from "@types";
import { ProductsFeatured, ProductsList } from "../../components";
import { maybe } from "../../core/utils";

import { Collection_collection, Collection_products } from "./types/Collection";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  collection: Collection_collection;
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  products: Collection_products;
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
  collection,
  displayLoader,
  hasNextPage,
  clearFilters,
  onLoadMore,
  products,
  filters,
  onOrder,
  sortOptions,
  onAttributeFiltersChange,
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  const hasProducts = canDisplayProducts && !!products.totalCount;
  const videoValues = collection.seoTitle;
  const srcVideo = "https://player.vimeo.com/video/" + videoValues + "?title=0&byline=0&portrait=0&loop=1&autopause=0";

  return (
    <div className="collection">
      <div className="collection__header"
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

      {videoValues ? <div className="product-page__product__video">
        <iframe src={srcVideo} allow="autoplay; fullscreen"></iframe>
      </div> : ''}

      {canDisplayProducts && (
        <>
          <ProductsList
            displayLoader={displayLoader}
            hasNextPage={hasNextPage}
            onLoadMore={onLoadMore}
            products={products.edges.map(edge => edge.node)}
            totalCount={products.totalCount}
          />
        </>
      )}
      {!hasProducts && <ProductsFeatured title="You might like" />}
    </div>
  );
};

export default Page;