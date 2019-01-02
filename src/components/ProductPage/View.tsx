import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";

import { getGraphqlIdFromDBId, maybe } from "../../core/utils";
import NetworkStatus from "../NetworkStatus";
import { NotFound } from "../NotFound";
import { OfflinePlaceholder } from "../OfflinePlaceholder";
import Page from "./Page";
import { TypedProductDetailsQuery } from "./queries";
import { ProductDetails } from "./types/ProductDetails";

const canDisplay = (data: ProductDetails) =>
  maybe(
    () =>
      !!data.product.description &&
      !!data.product.name &&
      !!data.product.price &&
      !!data.product.variants
  );

const View: React.SFC<RouteComponentProps<{ id: string }>> = ({ match }) => (
  <TypedProductDetailsQuery
    loaderFull
    variables={{
      id: getGraphqlIdFromDBId(match.params.id, "Product")
    }}
    errorPolicy="all"
    key={match.params.id}
  >
    {({ data }) => (
      <NetworkStatus>
        {isOnline => {
          if (canDisplay(data)) {
            return <Page product={data.product} />;
          }

          if (data && data.product === null) {
            return <NotFound />;
          }

          if (!isOnline) {
            return <OfflinePlaceholder />;
          }
        }}
      </NetworkStatus>
    )}
  </TypedProductDetailsQuery>
);

export default View;
