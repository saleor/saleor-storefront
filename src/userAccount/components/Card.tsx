import "./scss/Card.scss";

import React from "react";

export interface ICart {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card: React.FC<ICart> = ({ children, header, footer }) => (
  <div className="card">
    {!!header ? <div className="card__header">{header}</div> : ""}
    <div className="card__content">{children}</div>
    {!!footer ? <div>{footer}</div> : ""}
  </div>
);

export default Card;
