import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { Article, ArticleVariables } from "./gqlTypes/Article";

const articleQuery = gql`
  query Article($slug: String!) {
    page(slug: $slug) {
      contentJson
      id
      seoDescription
      seoTitle
      slug
      title
    }
    shop {
      homepageCollection {
        id
        backgroundImage {
          url
        }
      }
    }
  }
`;

export const TypedArticleQuery = TypedQuery<Article, ArticleVariables>(
  articleQuery
);
