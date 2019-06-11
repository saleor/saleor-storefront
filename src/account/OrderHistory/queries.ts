import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
import { OrdersByUser, OrdersByUserVariables } from "./types/OrdersByUser";

const ordersByUser = gql`
  query OrdersByUser($perPage: Int!, $after: String) {
    orders(first: $perPage, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          number
          statusDisplay
          created
          total {
            gross {
              localized
            }
          }
          lines {
            id
            variant {
              id
              product {
                name
                id
              }
            }
            thumbnail {
              alt
              url
            }
            thumbnail2x: thumbnail(size: 510) {
              url
            }
          }
        }
      }
    }
  }
`;

export const TypedOrdersByUser = TypedQuery<
  OrdersByUser,
  OrdersByUserVariables
>(ordersByUser);
