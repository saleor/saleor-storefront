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
  const productsListApi = await api.products.getList({
    first: staticPathsFetchBatch,
    channel: channelSlug,
  });

  await exhaustList(productsListApi);

  const paths = productsListApi.data.map(({ slug }) => ({
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
