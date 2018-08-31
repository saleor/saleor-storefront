import gql from "graphql-tag";

// TODO: we don't have productVariants query definition yet, for now use only one
// https://github.com/mirumee/saleor/issues/2741
export const GET_VARIANTS = gql`
  query VariantList($id: ID!) {
    productVariant(id: $id) {
      id
      stockQuantity
      costPrice {
        currency
        amount
      }
      product {
        id
        name
        thumbnailUrl
      }
    }
  }
`;
