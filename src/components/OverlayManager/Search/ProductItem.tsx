import * as React from "react";
import { Link } from "react-router-dom";

import { Thumbnail } from "@components/molecules";

import { generateProductUrl } from "../../../core/utils";
import { SearchResults_products_edges } from "./gqlTypes/SearchResults";

const ProductItem: React.FC<SearchResults_products_edges> = ({
  node: product,
}) => (
  <li className="search__products__item">
    <Link to={generateProductUrl(product.id, product.name)}>
      <Thumbnail source={product} />
      <span>
        <h4>{product.name}</h4>
        <p>{product.category.name}</p>
      </span>
    </Link>
  </li>
);

export default ProductItem;
