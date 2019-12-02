import { mediumScreen } from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";
import Media from "react-media";
import { Link } from "react-router-dom";

import { getDBIdFromGraphqlId, slugify } from "../../core/utils";
import { Category_category } from "../../views/Category/types/Category";

export interface BreadcrumbPage {
  value: string;
  link: string;
}

export const extractBreadcrumbsPage = (category: Category_category) => {
  const constructLink = item => ({
    link: [
      `/category`,
      `/${slugify(item.name)}`,
      `/${getDBIdFromGraphqlId(item.id, "Category")}/`,
    ].join(""),
    value: item.name,
  });

  let breadcrumbsPage = [constructLink(category)];

  if (category.ancestors.edges.length) {
    const ancestorsList = category.ancestors.edges.map(edge =>
      constructLink(edge.node)
    );
    breadcrumbsPage = ancestorsList.concat(breadcrumbsPage);
  }
  return breadcrumbsPage;
};

const BreadcrumbsPage: React.FC<{
  breadcrumbsPage: BreadcrumbPage[];
}> = ({ breadcrumbsPage }) => (
  <Media
    query={{
      minWidth: mediumScreen,
    }}
  >
    {matches =>
      matches ? (
        <ul className="breadcrumbs-page">
          {breadcrumbsPage.map((breadcrumbPage, index) => (
            <li
              key={breadcrumbPage.value}
              className={classNames({
                breadcrumbs__active: index === breadcrumbsPage.length - 1,
              })}
            ><Link to={breadcrumbPage.link}> {breadcrumbPage.value}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="breadcrumbs-page">
          {breadcrumbsPage.map((breadcrumbPage, index) => (
            <li
              key={breadcrumbPage.value}
              className={classNames({
                breadcrumbs__active: index === breadcrumbsPage.length - 1,
              })}
            ><Link to={breadcrumbPage.link}> {breadcrumbPage.value}</Link>
            </li>
          ))}
        </ul>
      )
    }
  </Media>
);

export default BreadcrumbsPage;
