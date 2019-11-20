import "./scss/index.scss";

import * as React from "react";

import { Thumbnail } from "@components/molecules";

import { BasicProductFields } from "../../views/Product/types/BasicProductFields";

import NumberFormat from 'react-number-format';

export interface Product extends BasicProductFields {
  category?: {
    id: string;
    name: string;
  };
  collections?: {
    id: string;
    name: string;
  };
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
    pricing: {
      priceRange: {
        start: {
          gross: { amount },
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
      <h3 className="product-list-item__title">{product.name}</h3>
      <p className="product-list-item__category">{category.name}</p>
      <p className="product-list-item__price"><NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
    </div>
  );
};

export default ProductListItem;
