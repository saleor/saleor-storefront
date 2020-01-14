import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";

import { MetaWrapper, NotFound, OfflinePlaceholder } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { getGraphqlIdFromDBId, maybe } from "../../core/utils";
import Page from "./Page";
import { TypedProductDetailsQuery } from "./queries";
import { ProductDetails_product } from "./types/ProductDetails";

const canDisplay = (product: ProductDetails_product) =>
  maybe(
    () =>
      !!product.descriptionJson &&
      !!product.name &&
      !!product.pricing &&
      !!product.variants
  );
const extractMeta = (product: ProductDetails_product) => ({
  custom: [
    {
      content: product.pricing.priceRange.start.gross.amount.toString(),
      property: "product:price:amount",
    },
    {
      content: product.pricing.priceRange.start.gross.currency,
      property: "product:price:currency",
    },
    {
      content: product.isAvailable ? "in stock" : "out off stock",
      property: "product:isAvailable",
    },
    {
      content: product.category.name,
      property: "product:category",
    },
  ],
  description: product.seoDescription || product.descriptionJson,
  image: maybe(() => product.thumbnail.url, null),
  title: product.seoTitle || product.name,
  type: "product.item",
  url: window.location.href,
});

const View: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => (
  <TypedProductDetailsQuery
    loaderFull
    variables={{
      id: getGraphqlIdFromDBId(match.params.id, "Product"),
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

          if (product === null) {
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
