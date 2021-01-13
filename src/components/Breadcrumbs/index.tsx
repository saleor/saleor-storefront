import classNames from "classnames";
import Link from "next/link";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-media";

import { paths } from "@paths";
import { commonMessages } from "@temp/intl";

import { getDBIdFromGraphqlId, slugify } from "../../core/utils";
import { Category_category } from "../../views/Category/gqlTypes/Category";

import "./scss/index.scss";
import { smallScreen } from "../../globalStyles/scss/variables.scss";

export interface Breadcrumb {
  value: string;
  link: string;
}

export const extractBreadcrumbs = (category: Category_category) => {
  const constructLink = item => ({
    link: [
      `/category`,
      `/${slugify(item.name)}`,
      `/${getDBIdFromGraphqlId(item.id, "Category")}/`,
    ].join(""),
    value: item.name,
  });

  let breadcrumbs = [constructLink(category)];

  if (category.ancestors.edges.length) {
    const ancestorsList = category.ancestors.edges.map(edge =>
      constructLink(edge.node)
    );
    breadcrumbs = ancestorsList.concat(breadcrumbs);
  }
  return breadcrumbs;
};

const getBackLink = (breadcrumbs: Breadcrumb[]) =>
  breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2].link : "/";

const Breadcrumbs: React.FC<{
  breadcrumbs: Breadcrumb[];
}> = ({ breadcrumbs }) => (
  <Media
    query={{
      minWidth: smallScreen,
    }}
  >
    {matches =>
      matches ? (
        <ul className="breadcrumbs">
          <li>
            <Link href={paths.home}>
              <a>
                <FormattedMessage {...commonMessages.home} />
              </a>
            </Link>
          </li>
          {breadcrumbs.map((breadcrumb, index) => (
            <li
              key={`${breadcrumb.value}-${index}`}
              className={classNames({
                breadcrumbs__active: index === breadcrumbs.length - 1,
              })}
            >
              <Link href={breadcrumb.link}>
                <a>{breadcrumb.value}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="breadcrumbs">
          <Link href={getBackLink(breadcrumbs)}>
            <a>
              <FormattedMessage defaultMessage="Back" />
            </a>
          </Link>
        </div>
      )
    }
  </Media>
);

export default Breadcrumbs;
