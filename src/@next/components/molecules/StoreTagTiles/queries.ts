import gql from "graphql-tag";

import { TypedMutation } from "../../../../core/mutations";
import { TypedQuery } from "../../../../core/queries";
import {
  IStoreForUser,
  IStoreType,
  IStoreUser,
  RegisterStore,
  RegisterStoreVariables,
  UpdateStore,
  UpdateStoreVariables,
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

const storeUpdateMutation = gql`
  mutation storeUpdate(
    $id: ID!
    $storeTypeId: ID!
    $name: String
    $description: JSONString
    $phone: String
    $acreage: Float
    $latlong: String
    $backgroundImage: Upload
    $backgroundImageAlt: String
  ) {
    storeUpdate(
      id: $id
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

export const TypedStoreUpdateMutation = TypedMutation<
  UpdateStore,
  UpdateStoreVariables
>(storeUpdateMutation);

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
      addresses {
        phone
      }
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

export const storeForUser = gql`
  query stores($id: ID!) {
    store(id: $id) {
      name
      description
      phone
      acreage
      latlong
      storeType {
        id
        name
      }
    }
  }
`;

export const TypeStoreForUserQuery = TypedQuery<IStoreForUser, {}>(
  storeForUser
);
