import gql from "graphql-tag";

import { TypedQuery } from "@temp/core/queries";

const getPostByFollow = gql`
  query getPostByFollow($first: Int) {
    postsByFollows(first: $first) {
      edges {
        node {
          id
          title
          content
          media {
            id
            image
            alt
          }
        }
      }
    }
  }
`;

export const TypedGetPostByFollows = TypedQuery<any, any>(getPostByFollow);
