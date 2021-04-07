import { NextPage } from "next";
import * as React from "react";

import { MetaWrapper } from "../../components";
import { HomePageProducts } from "./gqlTypes/HomePageProducts";
import Page from "./Page";

import "./scss/index.scss";

export interface HomeViewProps {
  data: HomePageProducts;
}

export const HomeView: NextPage<HomeViewProps> = ({
  data: { shop, collection, categories },
}) => (
  <div className="home-page">
    <MetaWrapper
      meta={{
        description: shop?.description || "",
        title: shop.name || "",
      }}
    >
      <Page collection={collection} categories={categories} shop={shop} />
    </MetaWrapper>
  </div>
);
