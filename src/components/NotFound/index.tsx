import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { matchPath } from "react-router";

import { Loader } from "@components/atoms";
import { paths } from "@paths";
import { exportMode } from "@temp/constants";

import Button from "../Button";

import "./scss/index.scss";

const REDIRECT_PATHS = [paths.accountOrderDetail, paths.guestOrderDetail];

interface NotFoundProps {
  message?: string;
}

const NotFound: NextPage<NotFoundProps> = () => {
  const { query, push } = useRouter();
  const shouldRedirect = useMemo(
    () => exportMode && query && "redirect_uri" in query,
    [query]
  );

  /**
   * Since there is no way to handle 404 after reload with dynamic rotues and static pages export,
   * hosting needs to have a rule, to redirect to `/404/?redirect_uri=uri` upon 404. That way we can
   * distinguish if it's a dynamic route and redirect user using client routing.
   */
  useEffect(() => {
    if (shouldRedirect) {
      const redirectUri = query.redirect_uri as string;
      const isValidPath = REDIRECT_PATHS.some(path =>
        matchPath(redirectUri, { path })
      );

      if (isValidPath) {
        push(redirectUri);
      } else {
        push(paths.notFound, paths.notFound, { shallow: true });
      }
    }
  }, [query]);

  return shouldRedirect ? (
    <Loader />
  ) : (
    <div className="not-found-page">
      <h2 className="not-found-page__header">
        <FormattedMessage defaultMessage="404" />
      </h2>
      <div className="not-found-page__ruler" />
      <div className="not-found-page__message">
        <p>
          <FormattedMessage defaultMessage="We can’t seem to find a page you are looking for!" />{" "}
        </p>
        <p>
          <FormattedMessage defaultMessage="You may have mistyped the address or the page may have moved." />{" "}
        </p>
        <p>
          <FormattedMessage defaultMessage="We’re sorry for the error and hope you’ll have a good day." />
        </p>
      </div>
      <div className="not-found-page__button">
        <Link href={paths.home}>
          <a>
            <Button testingContext="404pageGotoHomeButton" secondary>
              <FormattedMessage defaultMessage="Back to home" />
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
