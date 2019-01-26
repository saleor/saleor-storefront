import "./scss/index.scss";

import * as React from "react";

interface NotFoundProps {
  message?: string;
}

const NotFound: React.SFC<NotFoundProps> = ({ message }) => (
  <div className="not-found-page">
    <h2 className="not-found-page__header">
      {message || "Sorry, we couldn't find the page you're looking for :("}
    </h2>
  </div>
);

export default NotFound;
