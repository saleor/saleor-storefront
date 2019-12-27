import "./scss/index.scss";

import * as React from "react";

import { Loader, MetaWrapper } from "../../components";
import { maybe } from "../../core/utils";
import Page from "./Page";
import { TypedHomePageQuery } from "./queries";
import { ProductsList } from "./types/ProductsList";

const canDisplay = (data: ProductsList) =>
  maybe(() => !!data.shop.homepageCollection && !!data.categories.edges.length);

const View: React.FC = () => (
  <div className="home-page">
    <TypedHomePageQuery alwaysRender displayLoader={false} errorPolicy="all">
      {({ data, loading }) => {
        if (canDisplay(data) || true) {
          return (
            <MetaWrapper
              meta={{
                description: data.shop ? data.shop.description : "",
                title: data.shop ? data.shop.name : "",
              }}
            >
              <Page
                loading={loading}
                backgroundImage={
                  data.shop &&
                  data.shop.homepageCollection &&
                  data.shop.homepageCollection.backgroundImage
                }
                categories={data.categories}
                shop={data.shop}
              />
            </MetaWrapper>
          );
        }

        return <Loader full />;
      }}
    </TypedHomePageQuery>
  </div>
);

export default View;
