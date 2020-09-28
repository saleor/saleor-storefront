import "./scss/index.scss";

import { useCart } from "@saleor/sdk";
import { isEmpty } from "lodash";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useHistory } from "react-router-dom";

import { Loader } from "@components/atoms";
import { MetaWrapper, NotFound, OfflinePlaceholder } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { getGraphqlIdFromDBId, maybe } from "../../core/utils";
import { ProductDetails_product } from "./gqlTypes/ProductDetails";
import Page from "./Page";
import { TypedProductDetailsQuery } from "./queries";
import { IProps } from "./types";

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
      content: product.pricing?.priceRange?.start?.gross.amount.toString(),
      property: "product:price:amount",
    },
    {
      content: product.pricing?.priceRange?.start?.gross.currency,
      property: "product:price:currency",
    },
    {
      content: product.isAvailable ? "in stock" : "out off stock",
      property: "product:isAvailable",
    },
    {
      content: product.category?.name,
      property: "product:category",
    },
  ],
  description: product.seoDescription || product.descriptionJson,
  image: product?.thumbnail?.url || null,
  title: product.seoTitle || product.name,
  type: "product.item",
  url: window.location.href,
});

const PageWithQueryAttributes: React.FC<IProps> = props => {
  const { product } = props;
  const history = useHistory();
  const { search } = history.location;
  const searchQueryAttributes = queryString.parse(search);

  const onAttributeChangeHandler = (slug: string | null, value: string) => {
    history.replace(
      queryString.stringifyUrl(
        {
          query: { [slug]: value },
          url: `${history.location.pathname}${history.location.search}`,
        },
        { skipEmptyString: true }
      )
    );
  };
  const [queryAttributes, setQueryAttributes] = useState({});

  useEffect(() => {
    if (!isEmpty(searchQueryAttributes)) {
      const queryAttributes: Record<string, string> = {};
      product.variants.forEach(({ attributes }) => {
        attributes.forEach(({ attribute, values }) => {
          const selectedAttributeValue = searchQueryAttributes[attribute.slug];
          if (
            selectedAttributeValue &&
            values[0].value === selectedAttributeValue
          ) {
            if (
              isEmpty(queryAttributes) ||
              !attributes.filter(
                ({ attribute: { id }, values }) =>
                  queryAttributes[id] && queryAttributes[id] !== values[0].value
              ).length
            ) {
              queryAttributes[attribute.id] = selectedAttributeValue;
            }
          }
        });
      });
      setQueryAttributes(queryAttributes);
    }
  }, [product.variants.length]);

  useEffect(() => {
    history.replace(history.location.pathname);
  }, [queryAttributes]);

  return (
    <Page
      {...props}
      queryAttributes={queryAttributes}
      onAttributeChangeHandler={onAttributeChangeHandler}
    />
  );
};

const View: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const { addItem, items } = useCart();

  return (
    <TypedProductDetailsQuery
      loaderFull
      variables={{
        id: getGraphqlIdFromDBId(match.params.id, "Product"),
      }}
      errorPolicy="all"
      key={match.params.id}
    >
      {({ data, loading }) => (
        <NetworkStatus>
          {isOnline => {
            const { product } = data;
            if (canDisplay(product)) {
              return (
                <MetaWrapper meta={extractMeta(product)}>
                  <PageWithQueryAttributes
                    product={product}
                    add={addItem}
                    items={items}
                  />
                </MetaWrapper>
              );
            }

            if (loading) {
              return <Loader />;
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
};

export default View;
