import React from "react";
import "./scss/index.scss";

import { AddressFormModal, AddressGrid } from "@components/organisms";
import { AddressTypeEnum } from "@sdk/gqlTypes/globalTypes";
import { useDefaultUserAddress, useDeleteUserAddresss } from "@sdk/react";
import { ShopContext } from "../../components/ShopProvider/context";

import { buttonMessages } from "@saleor/intl"
import { useIntl } from "react-intl";

const AddressBook: React.FC<{
  user: any;
}> = ({ user }) => {
  const intl = useIntl();

  const { defaultCountry, countries } = React.useContext(ShopContext);
  const [displayNewModal, setDisplayNewModal] = React.useState(false);
  const [displayEditModal, setDisplayEditModal] = React.useState(false);
  const [addressData, setAddressData] = React.useState(null);
  const [setDefaultUserAddress] = useDefaultUserAddress();
  const [setDeleteUserAddress] = useDeleteUserAddresss();

  const userAddresses = user.addresses.map(address => {
    const addressToDisplay: any = { address: { ...address } };

    addressToDisplay.onEdit = () => {
      setDisplayEditModal(true);
      setAddressData({
        address,
        id: address.id,
      });
    };

    addressToDisplay.onRemove = () =>
      setDeleteUserAddress({
        addressId: address.id,
      });

    addressToDisplay.setDefault = (type: string) => {
      setDefaultUserAddress({
        id: address.id,
        type:
          type === "BILLING"
            ? AddressTypeEnum.BILLING
            : AddressTypeEnum.SHIPPING,
      });
    };
    return addressToDisplay;
  });

  return (
    <div className="address-book-container">
      <AddressGrid
        addresses={userAddresses}
        addNewAddress={() => {
          setDisplayNewModal(true);
        }}
      />
      {displayNewModal && (
        <AddressFormModal
          hideModal={() => {
            setDisplayNewModal(false);
          }}
          userId={user.id}
          {...{ defaultValue: defaultCountry ? defaultCountry : {} }}
          submitBtnText={"Add"}
          title={
            intl.formatMessage({
              defaultMessage: "Add new address",
              description: "add new address title",
            })
          }
          {...{ countriesOptions: countries }}
          formId="address-form"
        />
      )}
      {displayEditModal && (
        <AddressFormModal
          hideModal={() => {
            setDisplayEditModal(false);
          }}
          address={addressData}
          submitBtnText={intl.formatMessage(buttonMessages.save)}
          title={
            intl.formatMessage({
              defaultMessage: "Edit address",
              description: "edit address title",
            })
          }
          {...{ countriesOptions: countries }}
          formId="address-form"
        />
      )}
    </div>
  );
};

export default AddressBook;
