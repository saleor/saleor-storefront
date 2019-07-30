import React from "react";
import "./scss/index.scss";

import { AddressGrid } from "@components/organisms";
import { useDefaultUserAddress, useDeleteUserAddresss } from "@sdk/react";
import { AddressTypeEnum } from "../../@sdk/types/globalTypes";

const AddressBook: React.FC<{
  user: any;
}> = ({ user }) => {
  const [setDefaultUserAddress] = useDefaultUserAddress();
  const [setDeleteUserAddress] = useDeleteUserAddresss();

  const userAddresses = user.addresses.map(address => {
    const newAddress: any = { address: { ...address } };
    // TODO this will be changed after Select element will be used in Address edit/add modal
    newAddress.address.country = newAddress.address.country.country;

    newAddress.onEdit = () => undefined;
    newAddress.onRemove = () =>
      setDeleteUserAddress({
        addressId: address.id,
      });

    newAddress.setDefault = (type: string) => {
      setDefaultUserAddress({
        addressId: address.id,
        type:
          type === "BILLING"
            ? AddressTypeEnum.BILLING
            : AddressTypeEnum.SHIPPING,
        userId: user.id,
      });
    };
    return newAddress;
  });
  return (
    <div className="address-book-container">
      <AddressGrid addresses={userAddresses} />
    </div>
  );
};

export default AddressBook;
