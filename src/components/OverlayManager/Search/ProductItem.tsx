import Link from "next/link";
import * as React from "react";

import { Thumbnail } from "@components/molecules";
import { paths } from "@paths";

import { SearchResults_products_edges } from "./gqlTypes/SearchResults";

const ProductItem: React.FC<SearchResults_products_edges> = ({
  node: product,
}) => (
  <li className="search__products__item">
    <Link
      href={{
        pathname: paths.product,
        query: {
          slug: product.slug,
        },
      }}
    >
      <a>
        <Thumbnail source={product} />
        <span>
          <h4>{product.name}</h4>
          <p>{product.category?.name || "-"}</p>
        </span>
      </a>
    </Link>
  </li>
);

export default ProductItem;
