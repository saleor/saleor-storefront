import * as React from "react";
import { Link } from "react-router-dom";

import { generateCategoryUrl } from "../../../core/utils";
import { SearchResults_categories_edges } from "./types/SearchResults";

const CategoryItem: React.FC<SearchResults_categories_edges> = ({
  node: category,
}) => (
  <li className="search__products__item">
    <Link to={generateCategoryUrl(category.id, category.name)}>
      <span>
        <h4>{category.name}</h4>
        <p>Category</p>
      </span>
    </Link>
  </li>
);

export default CategoryItem;
