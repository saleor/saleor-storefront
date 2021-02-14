import { GetStaticPaths, GetStaticProps } from "next";

import {
  channelSlug,
  exportMode,
  incrementalStaticRegenerationRevalidate,
  staticPathsFetchBatch,
} from "@temp/constants";
import { exhaustList, getSaleorApi } from "@utils/ssr";

import { ProductPage, ProductPageProps } from "../../views/Product";

export default ProductPage;

export const getStaticPaths: GetStaticPaths<
  ProductPageProps["params"]
> = async () => {
  const { api } = await getSaleorApi();
  const { data } = await exhaustList(
    api.products.getList({
      first: staticPathsFetchBatch,
      channel: channelSlug,
    })
  );

  const paths = data.map(({ slug }) => ({
    params: { slug },
  }));

  return { paths, fallback: !exportMode };
};

export const getStaticProps: GetStaticProps<
  ProductPageProps,
  ProductPageProps["params"]
> = async ({ params }) => {
  const { api } = await getSaleorApi();
  const { data } = await api.products.getDetails({
    slug: params.slug,
    channel: channelSlug,
  });

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: { data: data || null, params },
  };
};
