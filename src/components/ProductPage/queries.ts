import gql from "graphql-tag";

export const GET_PRODUCT_DETAILS = gql`
  query ProductDetails($id: ID!) {
    product(id: $id) {
      id
      name
      description
      thumbnailUrl
    }
  }
`;
