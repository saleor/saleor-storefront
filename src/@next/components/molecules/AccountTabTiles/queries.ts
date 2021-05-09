import gql from "graphql-tag";

import { TypedMutation } from "../../../../core/mutations";
// import { TypedQuery } from "../../../../core/queries";
import {
  UpdateStaffInfoVariables,
  updateUserAddressVar,
  UploadPhoto,
} from "./StoreUserProfile";

const updateUserAddress = gql`
  mutation($addressInput: AddressInput!) {
    accountAddressCreate(input: $addressInput) {
      address {
        id
        city
      }
      user {
        email
      }
    }
  }
`;

export const TypeUpdateUserAddress = TypedMutation<any, updateUserAddressVar>(
  updateUserAddress
);

const updateStaffContact = gql`
  mutation UpdateStaff($id: ID!, $input: String!) {
    staffUpdate(id: $id, input: $input) {
      staffErrors {
        field
        code
        message
        permissions
        groups
      }
      user {
        userPermissions {
          code
        }
        permissions {
          code
        }
        permissionGroups {
          name
        }
        isActive
        addresses {
          phone
        }
      }
    }
  }
`;

export const TypeUpdateStaffUser = TypedMutation<any, UpdateStaffInfoVariables>(
  updateStaffContact
);

const updateAvatar = gql`
  mutation userAvatarUpdate($image: Upload!) {
    userAvatarUpdate(image: $image) {
      user {
        avatar {
          url
        }
      }
    }
  }
`;

export const TypeUpdateAvatarMutation = TypedMutation<any, UploadPhoto>(
  updateAvatar
);
