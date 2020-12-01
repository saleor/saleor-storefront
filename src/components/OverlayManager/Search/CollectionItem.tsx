import * as React from "react";
import { Link } from "react-router-dom";

import { ThumbnailCollection } from "@components/molecules";

import { generateCollectionUrl } from "../../../core/utils";
import { SearchResults_collections_edges } from "./gqlTypes/SearchResults";

const CollectionItem: React.FC<SearchResults_collections_edges> = ({
  node: collection,
}) => (
  <li className="search__products__item">
    <Link to={generateCollectionUrl(collection.id, collection.name)}>
      <ThumbnailCollection source={collection} />
      <span>
        <h4>{collection.name}</h4>
        <p>Collection</p>
      </span>
    </Link>
  </li>
);

export default CollectionItem;
