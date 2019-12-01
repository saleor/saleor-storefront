import * as React from "react";
import { Link } from "react-router-dom";

import { generatePageUrl } from "../../../core/utils";
import { SearchResults_pages_edges } from "./types/SearchResults";

const PageItem: React.FC<SearchResults_pages_edges> = ({
  node: page,
}) => (
  <li className="search__products__item">
    <Link to={generatePageUrl(page.slug)}>
      <span>
        <h4>{page.title}</h4>
        <p>Story</p>
      </span>
    </Link>
  </li>
);

export default PageItem;
