import "./scss/index.scss";

import * as React from "react";

import { Thumbnail } from "@components/molecules";

import { BasicProductFields } from "../../views/Product/types/BasicProductFields";

export interface Product extends BasicProductFields {
  category?: {
    id: string;
    name: string;
  };
  pricing: {
    priceRange: {
      start: {
        gross: {
          localized: string;
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
    pricing: {
      priceRange: {
        start: {
          gross: { localized },
        },
      },
    },
    category,
  } = product;
  return (
    <div className="product-list-item">
      <div className="product-list-item__image">
        <Thumbnail source={product} />
      </div>
      <h4 className="product-list-item__title">{product.name}</h4>
      <p className="product-list-item__category">{category.name}</p>
      <p className="product-list-item__price">{localized}</p>
    </div>
  );
};

export default ProductListItem;
