import React from "react";
import { useIntl } from "react-intl";
import "./scss/index.scss";

import { AddressFormModal, AddressGrid } from "@components/organisms";
import { checkoutMessages, commonMessages } from "@temp/intl";
import { useDefaultUserAddress, useDeleteUserAddresss } from "@saleor/sdk";
import { AddressTypeEnum } from "@saleor/sdk/lib/gqlTypes/globalTypes";
import { ShopContext } from "../../components/ShopProvider/context";

const AddressBook: React.FC<{
  user: any;
}> = ({ user }) => {
  const { defaultCountry, countries } = React.useContext(ShopContext);
  const [displayNewModal, setDisplayNewModal] = React.useState(false);
  const [displayEditModal, setDisplayEditModal] = React.useState(false);
  const [addressData, setAddressData] = React.useState(null);
  const [setDefaultUserAddress] = useDefaultUserAddress();
  const [setDeleteUserAddress] = useDeleteUserAddresss();
  const intl = useIntl();

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
          {...{ defaultValue: defaultCountry || {} }}
          submitBtnText={intl.formatMessage(commonMessages.add)}
          title={intl.formatMessage(checkoutMessages.addNewAddress)}
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
          submitBtnText={intl.formatMessage(commonMessages.save)}
          title={intl.formatMessage({ defaultMessage: "Edit address" })}
          {...{ countriesOptions: countries }}
          formId="address-form"
        />
      )}
    </div>
  );
};

export default AddressBook;
