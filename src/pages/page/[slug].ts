import { GetStaticPaths, GetStaticProps } from "next";

import {
  incrementalStaticRegenerationRevalidate,
  staticPathsFallback,
} from "@temp/constants";
import { ArticleView, ArticleViewProps } from "@temp/views/Article";
import {
  Article,
  ArticleVariables,
} from "@temp/views/Article/gqlTypes/Article";
import { Pages } from "@temp/views/Article/gqlTypes/Pages";
import { articleQuery, pagesQuery } from "@temp/views/Article/query";
import { getFeaturedProducts, getSaleorApi } from "@utils/ssr";

export default ArticleView;

export const getStaticPaths: GetStaticPaths<any> = async () => {
  const { apolloClient } = await getSaleorApi();
  const { data } = await apolloClient.query<Pages>({ query: pagesQuery });

  const paths = data.pages.edges.map(({ node }) => ({
    params: { slug: node.slug },
  }));

  return { paths, fallback: staticPathsFallback };
};

export const getStaticProps: GetStaticProps<
  ArticleViewProps,
  ArticleViewProps["params"]
> = async ({ params: { slug } }) => {
  const { apolloClient } = await getSaleorApi();

  const [featuredProducts, article] = await Promise.all([
    getFeaturedProducts(),
    apolloClient
      .query<Article, ArticleVariables>({
        query: articleQuery,
        variables: { slug },
      })
      .then(({ data }) => data.page),
  ]);

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: {
      data: { article, featuredProducts },
      params: { slug },
    },
  };
};
