import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { useMemo } from "react";
import { generatePath } from "react-router";

import { paths } from "@paths";
import { FeaturedProducts } from "@utils/ssr";

import { MetaWrapper, NotFound } from "../../components";
import { STATIC_PAGES } from "../../core/config";
import { Article_page } from "./gqlTypes/Article";
import Page from "./Page";

import "./scss/index.scss";

export interface ArticleViewProps {
  params: { slug: string };
  data: {
    article: Article_page | null;
    featuredProducts: FeaturedProducts;
  };
}

export const ArticleView: NextPage<ArticleViewProps> = ({ data }) => {
  const { pathname } = useRouter();
  const [canDisplay, headerImage] = useMemo(
    () => [data?.article, data?.featuredProducts?.backgroundImage.url],
    [data]
  );

  const navigation = STATIC_PAGES.map(page => ({
    ...page,
    active: page.url === pathname,
  }));

  const getBreadcrumbs = (article: Article_page) => [
    {
      link: generatePath(paths.page, { slug: article.slug }),
      value: article.title,
    },
  ];

  return canDisplay ? (
    <MetaWrapper
      meta={{
        description: data.article.seoDescription,
        title: data.article.seoTitle,
      }}
    >
      <Page
        breadcrumbs={getBreadcrumbs(data.article)}
        headerImage={headerImage}
        navigation={navigation}
        page={data.article}
      />
    </MetaWrapper>
  ) : (
    <NotFound />
  );
};
