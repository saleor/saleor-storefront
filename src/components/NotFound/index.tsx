import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

import { paths } from "@paths";

import Button from "../Button";

import "./scss/index.scss";

interface NotFoundProps {
  message?: string;
}

const NotFound: NextPage<NotFoundProps> = () => (
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

export default NotFound;
