import "./scss/index.scss";

import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../core/config";
import Button from "../Button";

interface NotFoundProps {
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = () => (
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
      <Link to={BASE_URL}>
        <Button testingContext="404pageGotoHomeButton" secondary>
          <FormattedMessage defaultMessage="Back to home" />
        </Button>
      </Link>
    </div>
  </div>
);

export default NotFound;
