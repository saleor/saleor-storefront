import { each, isEqual, omit, uniqWith } from "lodash";
import React from "react";

import { Button } from "../../../components";
import { FormAddressType } from "../../../components/ShippingAddressForm/types";
import { maybe } from "../../../core/utils";
import { AddressPicker } from "../../components/AddressPicker";
import {
  CheckoutFormType,
  IInitialUserAddressesArgs,
  UserAddressSelectorProps
} from "../../types";

const getInitialAddresses = ({
  type,
  checkout,
  user
}: IInitialUserAddressesArgs) => {
  const {
    addresses: userAddresses,
    defaultBillingAddress,
    defaultShippingAddress
  } = user;

  return uniqWith(
    each(
      [
        ...(type === "shipping"
          ? [maybe(() => checkout.shippingAddress, defaultShippingAddress)]
          : [maybe(() => checkout.billingAddress, defaultBillingAddress)]),
        ...userAddresses
      ].filter(address => address),
      address => omit(address, "id")
    ),
    isEqual
  );
};

const UserAddressSelector: React.FC<UserAddressSelectorProps> = ({
  buttonText,
  checkout,
  errors,
  loading,
  onSubmit,
  proceedToNextStep,
  shippingAsBilling,
  type = "shipping" as CheckoutFormType,
  update,
  user
}) => {
  const [addressesList, addAddressToList] = React.useState<FormAddressType[]>(
    getInitialAddresses({ type, checkout, user })
  );
  const [isVisibleAddNewModalForm, setModalVisibility] = React.useState<
    boolean
  >(false);
  const [
    selectedAddress,
    setSelectedAddress
  ] = React.useState<FormAddressType | null>(
    !shippingAsBilling ? addressesList[0] : null
  );

  const unselectAddress = () => {
    if (selectedAddress && shippingAsBilling) {
      setSelectedAddress(null);
    }
  };

  React.useEffect(() => {
    unselectAddress();
  });

  const uncheckShippingAsBilling = () => {
    if (shippingAsBilling) {
      update({
        shippingAsBilling: false
      });
    }
  };

  const handleAddressSelect = (address: FormAddressType) => {
    setSelectedAddress(address);
    uncheckShippingAsBilling();
  };

  const updateAddresses = (address: FormAddressType) => {
    const isSelectedAsNew = address.asNew;

    addAddressToList([...addressesList, address]);
    if (isSelectedAsNew) {
      uncheckShippingAsBilling();
      setSelectedAddress(address);
    }

    setModalVisibility(false);
  };

  const handleAddressAdd = async (address: FormAddressType) => {
    await onSubmit(address);

    if (!errors.length) {
      updateAddresses(address);
    }
  };

  return (
    <>
      <AddressPicker
        addresses={addressesList}
        type={type}
        errors={errors}
        loading={loading}
        onAddressSelect={handleAddressSelect}
        handleAddressAdd={handleAddressAdd}
        selectedAddress={selectedAddress}
        isVisibleAddNewModalForm={isVisibleAddNewModalForm}
        hideAddNewModalForm={() => setModalVisibility(false)}
        showAddNewModalForm={() => setModalVisibility(true)}
      />
      <Button
        type="submit"
        disabled={(!selectedAddress && !shippingAsBilling) || loading}
        onClick={proceedToNextStep.bind(null, selectedAddress)}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default UserAddressSelector;
