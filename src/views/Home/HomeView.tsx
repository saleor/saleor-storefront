import { NextPage } from "next";
import * as React from "react";

import { FeaturedProducts } from "@utils/ssr";

import { MetaWrapper } from "../../components";
import { HomePageProducts } from "./gqlTypes/HomePageProducts";
import Page from "./Page";

import "./scss/index.scss";

export interface HomeViewProps {
  data: HomePageProducts & { featuredProducts: FeaturedProducts };
}

export const HomeView: NextPage<HomeViewProps> = ({
  data: { shop, featuredProducts, categories },
}) => (
  <div className="home-page">
    <MetaWrapper
      meta={{
        description: shop?.description || "",
        title: shop.name || "",
      }}
    >
      <Page
        featuredProducts={featuredProducts}
        categories={categories}
        shop={shop}
      />
    </MetaWrapper>
  </div>
);
