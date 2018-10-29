import * as React from "react";
import { Link } from "react-router-dom";

import { baseUrl } from "../App/routes";

import "./scss/index.scss";

const Breadcrumbs: React.SFC<{
  breadcrumbs: Array<{ value: string; link: string }>;
}> = ({ breadcrumbs }) => (
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

export default Breadcrumbs;
