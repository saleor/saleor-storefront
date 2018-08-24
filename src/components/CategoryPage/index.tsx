import * as React from "react";
import { RouteComponentProps } from "react-router";

import "./scss/index.scss";

const CategoryPage: React.SFC<RouteComponentProps<{ id; slug }>> = ({
  match: {
    params: { slug = "" }
  }
}) => <div>{slug} page</div>;

export default CategoryPage;
