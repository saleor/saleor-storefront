import gql from "graphql-tag";

export const homePageProductsQuery = gql`
  query HomePageProducts {
    shop {
      description
      name
    }
    categories(level: 0, first: 4) {
      edges {
        node {
          id
          name
          slug
          backgroundImage {
            url
          }
        }
      }
    }
  }
`;
