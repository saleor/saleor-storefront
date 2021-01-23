import { GetStaticPaths, GetStaticProps } from "next";

import {
  channelSlug,
  exportMode,
  incrementalStaticRegenerationRevalidate,
} from "@temp/constants";
import { getDBIdFromGraphqlId } from "@utils/core";
import { exhaustList, getSaleorApi } from "@utils/ssr";

import { ProductPage, ProductPageProps } from "../../../views/Product";

export default ProductPage;

export const getStaticPaths: GetStaticPaths<
  ProductPageProps["params"]
> = async () => {
  const { api } = await getSaleorApi();
  const productsListApi = await api.products.getList({
    first: 20,
    channel: channelSlug,
  });

  await exhaustList(productsListApi);

  const paths = productsListApi.data.map(({ slug, id }) => ({
    params: { slug, id: getDBIdFromGraphqlId(id, "Product").toString() },
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
    props: { data, params },
  };
};
