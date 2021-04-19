import gql from "graphql-tag";

import { TypedMutation } from "../../../../core/mutations";
import { TypedQuery } from "../../../../core/queries";
import {
  IStoreType,
  IStoreUser,
  RegisterStore,
  RegisterStoreVariables,
} from "./gqlTypes/RegisterStore";

const storeRegisterMutation = gql`
  mutation createStore(
    $storeTypeId: ID!
    $name: String
    $description: JSONString
    $phone: String
    $acreage: Float
    $latlong: String
    $backgroundImage: Upload
    $backgroundImageAlt: String
  ) {
    storeCreate(
      input: {
        name: $name
        description: $description
        storeType: $storeTypeId
        phone: $phone
        acreage: $acreage
        latlong: $latlong
        backgroundImage: $backgroundImage
        backgroundImageAlt: $backgroundImageAlt
      }
    ) {
      store {
        id
        name
        description
        phone
        latlong
        backgroundImage {
          alt
        }
      }
      storeErrors {
        message
        field
      }
    }
  }
`;

export const TypedStoreRegisterMutation = TypedMutation<
  RegisterStore,
  RegisterStoreVariables
>(storeRegisterMutation);

export const storeTypeQuery = gql`
  query stores {
    storeTypes(first: 10) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const TypedListStoreTypeQuery = TypedQuery<IStoreType, {}>(
  storeTypeQuery
);

export const listStoreUserQuery = gql`
  query User($id: ID!) {
    user(id: $id) {
      store {
        id
        name
      }
    }
  }
`;
export const TypeListStoreUserQuery = TypedQuery<IStoreUser, {}>(
  listStoreUserQuery
);
