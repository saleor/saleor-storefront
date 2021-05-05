import gql from "graphql-tag";

import { TypedMutation } from "@temp/core/mutations";

import { FollowVariables, IFollowProps } from "./gqlTypes/types";

const followMutation = gql`
  mutation createSocial($follow: Boolean!, $store: ID!) {
    socialCreate(input: { follow: $follow, store: $store }) {
      social {
        follow
      }
      socialErrors {
        code
        field
      }
    }
  }
`;

export const TypedFollowMutation = TypedMutation<IFollowProps, FollowVariables>(
  followMutation
);
