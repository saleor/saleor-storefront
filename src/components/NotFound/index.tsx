import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../core/config";
import Button from "../Button";

import { FormattedMessage } from "react-intl";

interface NotFoundProps {
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = () => (
  <div className="not-found-page">
    <h2 className="not-found-page__header">404</h2>
    <div className="not-found-page__ruler" />
    <div className="not-found-page__message">
      <p>
        <FormattedMessage
          defaultMessage={"We can’t seem to find a page you are looking for!"}
          description={"not found page message"}
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage={"You may have mistyped the address or the page may have moved."}
          description={"not found page message"}
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage={"We’re sorry for the error and hope you’ll have a good day."}
          description={"not found page message"}
        />
      </p>
    </div>
    <div className="not-found-page__button">
      <Link to={BASE_URL}>
        <Button secondary>
          <FormattedMessage
            defaultMessage={"Back to home"}
            description={"not found page button"}
          />
        </Button>
      </Link>
    </div>
  </div>
);

export default NotFound;
