import * as React from "react";
import { Link } from "react-router-dom";

import { CachedImage } from "..";
import { generateProductUrl, maybe } from "../../core/utils";
import { SearchResults_products_edges } from "./types/SearchResults";

const noPhotoPng = require("../../images/nophoto.png");

const ProductItem: React.SFC<SearchResults_products_edges> = ({
  node: product
}) => (
  <li className="search__products__item">
    <Link to={generateProductUrl(product.id, product.name)}>
      <CachedImage
        url={maybe(() => product.thumbnail.url, noPhotoPng)}
        url2x={maybe(() => product.thumbnail2x.url, noPhotoPng)}
      />
      <span>
        <h4>{product.name}</h4>
        <p>{product.category.name}</p>
      </span>
    </Link>
  </li>
);

export default ProductItem;
