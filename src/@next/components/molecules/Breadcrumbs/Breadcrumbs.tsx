import { smallScreen } from "@styles/constants";
import { BASE_URL } from "@temp/core/config";
import { commonMessages } from "@temp/intl";
import React from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-media";
import { Link } from "react-router-dom";
import * as S from "./styles";

export interface Breadcrumb {
  value: string;
  link: string;
}

export interface IBreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

export const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({ breadcrumbs }) => {
  const getBackLink = (breadcrumbs: Breadcrumb[]) =>
    breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2].link : "/";

  return (
    <Media
      query={{
        minWidth: smallScreen,
      }}
    >
      {matches =>
        matches ? (
          <S.BreadcrumbList>
            <S.BreadcrumbElement>
              <Link to={BASE_URL}>
                <FormattedMessage {...commonMessages.home} />
              </Link>
            </S.BreadcrumbElement>
            {breadcrumbs.map((breadcrumb, index) => (
              <S.BreadcrumbElement>
                {/* key={breadcrumb.value}
                className={index === breadcrumbs.length - 1 ? "active" : ""}> */}
                <Link to={breadcrumb.link}>{breadcrumb.value}</Link>
              </S.BreadcrumbElement>
            ))}
          </S.BreadcrumbList>
        ) : (
          <S.BreadcrumbList>
            <Link to={getBackLink(breadcrumbs)}>
              <FormattedMessage defaultMessage="Back" />
            </Link>
          </S.BreadcrumbList>
        )
      }
    </Media>
  );
};
Breadcrumbs.displayName = "Breadcrumbs";
export default Breadcrumbs;
