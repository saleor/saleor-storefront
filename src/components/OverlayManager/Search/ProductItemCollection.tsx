import * as React from "react";
import { Link } from "react-router-dom";

import { generateCollectionUrl } from "../../../core/utils";
import { SearchResults_collections_edges } from "./types/SearchResults";

const CollectionItem: React.FC<SearchResults_collections_edges> = ({
  node: collection,
}) => (
  <li className="search__products__item">
    <Link to={generateCollectionUrl(collection.id, collection.name)}>
      <span>
        <h4>{collection.name}</h4>
      </span>
    </Link>
  </li>
);

export default CollectionItem;
