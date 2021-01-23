import { NextPage } from "next";
// import { useRouter } from "next/router";
import * as React from "react";

import { Loader } from "@components/atoms";

import { MetaWrapper } from "../../components";
import { HomePageProducts } from "./gqlTypes/HomePageProducts";
import Page from "./Page";

import "./scss/index.scss";

export interface HomePageProps {
  data: HomePageProducts;
}

export const HomePage: NextPage<HomePageProps> = ({
  data: { shop, collection, categories },
}) => {
  // TODO: How to handle order by token generation
  // const { pathname, asPath } = useRouter();
  // const shouldRedirect = pathname === "/" && pathname !== asPath;
  const shouldRedirect = false;

  /**
   * With next export, static pages are generated. We have dynamic routes and serve them via nginx.
   * It's pointing to /index.html so after refresh a 404 will occour. This is a temporary workaraound since
   * the goal is to generate all existing products, categories etc via static pages generation which will
   * be added in SALEOR-1566.
   */
  // React.useEffect(() => {
  //   if (shouldRedirect) {
  //     replace(asPath);
  //   }
  // }, []);

  return (
    <div className="home-page">
      {shouldRedirect ? (
        <Loader fullScreen />
      ) : (
        <MetaWrapper
          meta={{
            description: shop?.description || "",
            title: shop.name || "",
          }}
        >
          <Page collection={collection} categories={categories} shop={shop} />
        </MetaWrapper>
      )}
    </div>
  );
};
