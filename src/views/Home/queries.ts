import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";

import { ProductsList, ProductsListVariables } from "./gqlTypes/ProductsList";

export const homePageQuery = gql`
  query ProductsList(
    $locale:LanguageCodeEnum!
  ) {
    shop {
      description
      name
      homepageCollection {
        id
        backgroundImage {
          url
        }
        name
        translation(languageCode:$locale){name}
      }
    }
    categories(level: 0, first: 4) {
      edges {
        node {
          id
          name
          backgroundImage {
            url
          }
          translation(languageCode:$locale){name}
        }
      }
    }
  }
`;

export const TypedHomePageQuery = TypedQuery<ProductsList, ProductsListVariables>(homePageQuery);
