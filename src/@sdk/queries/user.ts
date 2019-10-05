import gql from "graphql-tag";

import { userFragment } from "../fragments/auth";
import { orderDetailFragment } from "../fragments/user";

export const orderDetailsByTokenQuery = gql`
  ${orderDetailFragment}
  query OrderByToken($token: UUID!) {
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
