import { GetStaticProps } from "next";

import { incrementalStaticRegenerationRevalidate } from "@temp/constants";
import { SearchPage, SearchPageProps } from "@temp/views/Search";
import { getFeaturedProducts } from "@utils/ssr";

export default SearchPage;

export const getStaticProps: GetStaticProps<SearchPageProps> = async () => {
  const featuredProducts = await getFeaturedProducts();

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: { data: featuredProducts },
  };
};
