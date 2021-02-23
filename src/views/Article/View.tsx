import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

import { channelSlug } from "@temp/constants";

import { MetaWrapper, NotFound } from "../../components";
import { STATIC_PAGES } from "../../core/config";
import { generatePageUrl, maybe } from "../../core/utils";
import { Article_collection } from "./gqlTypes/Article";
import Page from "./Page";
import { TypedArticleQuery } from "./query";

import "./scss/index.scss";

const canDisplay = page => !!page?.title;

const getHeaderImage = (collection: Article_collection) =>
  maybe(() => collection.backgroundImage.url);

export type ViewProps = { query: { slug: string } };

export const View: NextPage<ViewProps> = ({ query: { slug } }) => {
  const { pathname } = useRouter();

  return (
    <TypedArticleQuery
      loaderFull
      variables={{ slug, channel: channelSlug }}
      errorPolicy="all"
    >
      {({ data }) => {
        const navigation = STATIC_PAGES.map(page => ({
          ...page,
          active: page.url === pathname,
        }));
        const { page, collection } = data;

        if (canDisplay(page)) {
          const breadcrumbs = [
            {
              link: generatePageUrl(slug),
              value: page.title,
            },
          ];
          return (
            <MetaWrapper
              meta={{
                description: page.seoDescription,
                title: page.seoTitle,
              }}
            >
              <Page
                breadcrumbs={breadcrumbs}
                headerImage={getHeaderImage(collection)}
                navigation={navigation}
                page={data.page}
              />
            </MetaWrapper>
          );
        }

        if (page === null) {
          return <NotFound />;
        }
      }}
    </TypedArticleQuery>
  );
};

export default View;
