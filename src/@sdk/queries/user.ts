import gql from "graphql-tag";

import { userFragment } from "../fragments/auth";
import { orderDetailFragment } from "../fragments/user";

// TODO: why are there 2?
export const orderDetailsByIdQuery = gql`
  ${orderDetailFragment}
  query OrderById($id: ID!) {
    order(id: $id) {
      ...OrderDetail
    }
  }
`;

export const orderDetailsByTokenQuery = gql`
  ${orderDetailFragment}
  query OrderByToken($token: String!) {
    orderByToken(token: $token) {
      ...OrderDetail
    }
  }
`;

export const getUserDetailsQuery = gql`
  ${userFragment}
  query UserDetails {
    me {
      ...User
    }
  }
`;
