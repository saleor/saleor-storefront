import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";

import { MetaWrapper } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { NotFound } from "../../components/NotFound";
import { OfflinePlaceholder } from "../../components/OfflinePlaceholder";
import { getGraphqlIdFromDBId, maybe } from "../../core/utils";
import Page from "./Page";
import { TypedProductDetailsQuery } from "./queries";
import { ProductDetails_product } from "./types/ProductDetails";

const canDisplay = (product: ProductDetails_product) =>
  maybe(
    () =>
      !!product.description &&
      !!product.name &&
      !!product.price &&
      !!product.variants
  );
const extractMeta = (product: ProductDetails_product) => ({
  /* tslint:disable:object-literal-sort-keys */
  description: product.seoDescription || product.name,
  image: product.thumbnail.url,
  title: product.seoTitle || product.name,
  type: "product.item",
  url: window.location.href,
  custom: [
    {
      property: "product:price:amount",
      content: product.price.amount.toString()
    },
    {
      property: "product:price:currency",
      content: product.price.currency
    },
    {
      property: "product:availability",
      content: product.availability.available ? "in stock" : "out off stock"
    },
    {
      property: "product:category",
      content: product.category.name
    }
  ]
  /* tslint:enable:object-literal-sort-keys */
});

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
          const { product } = data;
          if (canDisplay(product)) {
            return (
              <MetaWrapper meta={extractMeta(product)}>
                <Page product={product} />
              </MetaWrapper>
            );
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
