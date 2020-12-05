import "./scss/index.scss";

import * as React from "react";
import { NextPage } from "next";

import { channelSlug } from "@temp/constants";
import { MetaWrapper } from "../../components";
import Page from "./Page";
import { TypedHomePageQuery } from "./queries";

const View: React.FC<NextPage> = () => (
  <div className="home-page">
    <TypedHomePageQuery
      alwaysRender
      displayLoader={false}
      variables={{ channel: channelSlug }}
      errorPolicy="all"
    >
      {({ data, loading }) => {
        return (
          <MetaWrapper
            meta={{
              description: data.shop ? data.shop.description : "",
              title: data.shop ? data.shop.name : "",
            }}
          >
            <Page
              loading={loading}
              backgroundImage={data.collection?.backgroundImage}
              categories={data.categories}
              shop={data.shop}
            />
          </MetaWrapper>
        );
      }}
    </TypedHomePageQuery>
  </div>
);

export default View;
