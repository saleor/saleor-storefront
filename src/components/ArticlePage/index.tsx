import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";

import Loader from "../Loader";
import ArticlePage from "./ArticlePage";
import GET_ARTICLE from "./query";

import { STATIC_PAGES } from "../../core/config";
import { generatePageUrl } from "../../core/utils";
import "./scss/index.scss";

interface RouteParams {
  slug: string;
}
type ArticleViewProps = RouteComponentProps<RouteParams>;

const canDisplay = data =>
  data && data.page && data.page.title && data.page.content;
const getHeaderImage = data =>
  data &&
  data.shop &&
  data.shop.homepageCollection &&
  data.shop.homepageCollection.backgroundImage
    ? data.shop.homepageCollection.backgroundImage.url
    : null;

export const ArticleView: React.SFC<ArticleViewProps> = ({
  match: {
    params: { slug }
  }
}) => (
  <Query
    query={GET_ARTICLE}
    variables={{ slug }}
    fetchPolicy="cache-and-network"
    errorPolicy="all"
  >
    {({ data, error }) => {
      const navigation = STATIC_PAGES.map(page => ({
        ...page,
        active: page.url === window.location.pathname
      }));

      if (canDisplay(data)) {
        const breadcrumbs = [
          {
            link: generatePageUrl(slug),
            value: data.page.title
          }
        ];
        return (
          <ArticlePage
            breadcrumbs={breadcrumbs}
            headerImage={getHeaderImage(data)}
            navigation={navigation}
            page={data.page}
          />
        );
      }
      if (error) {
        return "error";
      }
      return <Loader />;
    }}
  </Query>
);
export default ArticleView;
