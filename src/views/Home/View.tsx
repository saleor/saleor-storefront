import "./scss/index.scss";

import * as React from "react";

import { MetaWrapper } from "../../components";
import Page from "./Page";
import { TypedHomePageQuery } from "./queries";

import useLocale from "@saleor/@next/hooks/useLocale";

const View: React.FC = () => {
  const { locale } = useLocale();
  const variables = {locale:locale.toUpperCase()}
  return(
  <div className="home-page">
    <TypedHomePageQuery
      variables={variables}
      alwaysRender
      displayLoader={false}
      errorPolicy="all">
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
      }}
    </TypedHomePageQuery>
  </div>
)};

export default View;
