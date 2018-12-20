import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";

import { getDBIdFromGraphqlId, slugify } from "../../core/utils";
import { Category_category } from "../../views/Category/types/Category";
import { baseUrl } from "../App/routes";

export interface Breadcrumb {
  value: string;
  link: string;
}

export const extractBreadcrumbs = (
  iterable: Category_category,
  type: "Category"
) => {
  const constructLink = item => ({
    link: [
      `/${type.toLowerCase()}`,
      `/${slugify(item.name)}`,
      `/${getDBIdFromGraphqlId(item.id, type)}/`
    ].join(""),
    value: item.name
  });

  let breadcrumbs = [constructLink(iterable)];

  if (iterable.ancestors.edges.length) {
    const ancestorsList = iterable.ancestors.edges.map(constructLink);
    breadcrumbs = ancestorsList.concat(breadcrumbs);
  }
  return breadcrumbs;
};

const Breadcrumbs: React.SFC<{
  breadcrumbs: Breadcrumb[];
}> = ({ breadcrumbs }) => {
  return (
    <ul className="breadcrumbs">
      <li>
        <Link to={baseUrl}>Home</Link>
      </li>
      {breadcrumbs.map(breadcrumb => (
        <li key={breadcrumb.value}>
          <Link to={breadcrumb.link}>{breadcrumb.value}</Link>
        </li>
      ))}
    </ul>
  );
};
export default Breadcrumbs;
