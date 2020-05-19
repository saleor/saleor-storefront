import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { Article, ArticleVariables } from "./gqlTypes/Article";

const articleQuery = gql`
  query Article(
    $slug: String!
    $locale:LanguageCodeEnum!
    ) {
    page(slug: $slug) {
      contentJson
      id
      seoDescription
      seoTitle
      slug
      title
      translation(languageCode:$locale){
        title
        contentJson
      }
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
