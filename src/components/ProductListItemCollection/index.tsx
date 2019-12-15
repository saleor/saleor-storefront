import "./scss/index.scss";

import * as React from "react";

import { ThumbnailCollection } from "@components/molecules";

import { BasicProductFields } from "../../views/Product/types/BasicProductFields";

export interface ProductCollectionBackgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductCollections {
  __typename: "ProductCollections";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  description: string;
}

export interface Product extends BasicProductFields {
  category?: {
    id: string;
    name: string;
  };
  collections?: Array<ProductCollections | null> | null;
  pricing: {
    priceRange: {
      start: {
        gross: {
          localized: string;
          amount: number;
        };
      };
    };
  };
}

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const {
    collections,
  } = product;
  return (
    <div className="product-list-item">
      <div className="product-list-item__image">
        <ThumbnailCollection source={product} />
        <ThumbnailCollection source={product} />
      </div>
      <h3 className="product-list-item__title">{collections[0].name}</h3>
      <p className="product-list-item__category">{collections[0].description}</p>
    </div>
  );
};

export default ProductListItem;
