import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

import { Loader } from "@components/atoms";
import { channelSlug } from "@temp/constants";

import { MetaWrapper } from "../../components";
import Page from "./Page";
import { TypedHomePageQuery } from "./queries";

import "./scss/index.scss";

const View: React.FC<NextPage> = () => {
  const { pathname, asPath, replace } = useRouter();
  const shouldRedirect = pathname === "/" && pathname !== asPath;

  /**
   * With next export, static pages are generated. We have dynamic routes and serve them via nginx.
   * It's pointing to /index.html so after refresh a 404 will occour. This is a temporary workaraound since
   * the goal is to generate all existing products, categories etc via static pages generation which will
   * be added in SALEOR-1566.
   */
  React.useEffect(() => {
    if (shouldRedirect) {
      replace(asPath);
    }
  }, []);

  return (
    <div className="home-page">
      {shouldRedirect ? (
        <Loader fullScreen />
      ) : (
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
      )}
    </div>
  );
};

export default View;
