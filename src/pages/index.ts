import { GetStaticProps } from "next";

import {
  channelSlug,
  incrementalStaticRegenerationRevalidate,
} from "@temp/constants";
import { getSaleorApi } from "@utils/ssr";

import { HomePage, homePageProductsQuery } from "../views/Home";
import {
  HomePageProducts,
  HomePageProductsVariables,
} from "../views/Home/gqlTypes/HomePageProducts";

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const { apolloClient } = await getSaleorApi();
  const { data } = await apolloClient.query<
    HomePageProducts,
    HomePageProductsVariables
  >({
    query: homePageProductsQuery,
    variables: { channel: channelSlug },
  });

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: { data },
  };
};
