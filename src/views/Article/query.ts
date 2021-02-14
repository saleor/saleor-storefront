import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { Article, ArticleVariables } from "./gqlTypes/Article";

const articleQuery = gql`
  query Article($slug: String!, $channel: String) {
    page(slug: $slug) {
      content
      id
      seoDescription
      seoTitle
      slug
      title
    }
    collection(slug: "featured-products", channel: $channel) {
      id
      backgroundImage {
        url
      }
    }
  }
`;

export const TypedArticleQuery = TypedQuery<Article, ArticleVariables>(
  articleQuery
);
