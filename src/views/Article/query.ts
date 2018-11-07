import gql from "graphql-tag";

export default gql`
  query Article($slug: String!) {
    page(slug: $slug) {
      content
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
