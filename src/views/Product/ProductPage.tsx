import { useCart } from "@saleor/sdk";
import { ProductDetails } from "@saleor/sdk/lib/fragments/gqlTypes/ProductDetails";
import { NextPage } from "next";
import { useRouter } from "next/router";
import queryString from "query-string";
import React, { useEffect, useState } from "react";

import { Loader, OfflinePlaceholder } from "@components/atoms";

import { MetaWrapper, NotFound } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import Page from "./Page";
import { IProps } from "./types";

import "./scss/index.scss";

const canDisplay = (product?: ProductDetails) =>
  !!product?.name && !!product?.pricing && !!product?.variants;

const extractMeta = (product: ProductDetails, url: string) => ({
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
  description: product.seoDescription || product.description,
  image: product?.thumbnail?.url || null,
  title: product.seoTitle || product.name,
  type: "product.item",
  url: window.location.href,
});

const PageWithQueryAttributes: React.FC<IProps> = props => {
  const { product } = props;
  const { pathname, push, query, asPath } = useRouter();

  const onAttributeChangeHandler = (slug: string | null, value: string) => {
    const newAsPath = queryString.stringifyUrl(
      { query: { [slug]: value }, url: asPath },
      { skipNull: true }
    );
    push({ pathname, query }, newAsPath, { shallow: true });
  };
  const [queryAttributes, setQueryAttributes] = useState({});

  useEffect(() => {
    if (!Object.keys(query).length) {
      const queryAttributes: Record<string, string> = {};
      product.variants.forEach(({ attributes }) => {
        attributes.forEach(({ attribute, values }) => {
          const selectedAttributeValue = query[attribute.slug];
          if (
            selectedAttributeValue &&
            values[0].value === selectedAttributeValue
          ) {
            if (
              !Object.keys(queryAttributes).length ||
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

  return (
    <Page
      {...props}
      queryAttributes={queryAttributes}
      onAttributeChangeHandler={onAttributeChangeHandler}
    />
  );
};

export type ProductPageProps = {
  params: { slug: string } | undefined;
  data: ProductDetails | undefined | null;
};

export const ProductPage: NextPage<ProductPageProps> = ({ data: product }) => {
  const { addItem, items } = useCart();
  const { asPath } = useRouter();

  return (
    <NetworkStatus>
      {isOnline => {
        if (canDisplay(product)) {
          return (
            <MetaWrapper
              meta={extractMeta(product, queryString.parseUrl(asPath).url)}
            >
              <PageWithQueryAttributes
                product={product}
                add={addItem}
                items={items}
              />
            </MetaWrapper>
          );
        }

        if (!product) {
          return product === null ? <NotFound /> : <Loader fullScreen />;
        }

        if (!isOnline) {
          return <OfflinePlaceholder />;
        }
      }}
    </NetworkStatus>
  );
};
