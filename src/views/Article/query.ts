import gql from "graphql-tag";

export const pagesQuery = gql`
  query Pages {
    pages(first: 50) {
      edges {
        node {
          id
          slug
        }
      }
    }
  }
`;

export const articleQuery = gql`
  query Article($slug: String!) {
    page(slug: $slug) {
      content
      id
      seoDescription
      seoTitle
      slug
      title
    }
  }
`;
