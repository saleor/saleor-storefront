import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
import { OrdersByUser } from "./types/OrdersByUser";

const ordersByUser = gql`
  query OrdersByUser {
    orders(last: 2) {
      pageInfo {
        hasPreviousPage
        startCursor
      }
      edges {
        node {
          id
          number
          status
          created
          total {
            gross {
              localized
            }
          }
          lines {
            variant {
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

export const TypedOrdersByUser = TypedQuery<OrdersByUser, null>(ordersByUser);
