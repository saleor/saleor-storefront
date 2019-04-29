import { each, isEqual, omit, uniqWith } from "lodash";
import React from "react";

import { Button } from "../../../components";
import { FormAddressType } from "../../../components/ShippingAddressForm/types";
import { maybe } from "../../../core/utils";
import { AddressPicker } from "../../components/AddressPicker";
import {
  UserAddressSelectorProps,
  UserAddressSelectorState
} from "../../types";

class UserAddressSelector extends React.PureComponent<
  UserAddressSelectorProps,
  UserAddressSelectorState
> {
  constructor(props: UserAddressSelectorProps) {
    super(props);
    const {
      checkout,
      type = "shipping",
      user: {
        addresses: userAddresses,
        defaultBillingAddress,
        defaultShippingAddress
      }
    } = props;
    const addresses = [
      ...(type === "shipping"
        ? [maybe(() => checkout.shippingAddress, defaultShippingAddress)]
        : [maybe(() => checkout.billingAddress, defaultBillingAddress)]),
      ...userAddresses
    ].filter(address => address);

    this.state = {
      addresses: uniqWith(
        each(addresses, address => omit(address, "id")),
        isEqual
      ),
      isVisibleAddNewModalForm: false,
      selectedAddress: !props.shippingAsBilling && addresses[0]
    };
  }

  componentDidUpdate() {
    this.unselectAddress();
  }

  showAddNewModalForm = () => this.setState({ isVisibleAddNewModalForm: true });
  hideAddNewModalForm = () =>
    this.setState({ isVisibleAddNewModalForm: false });

  handleAddressSelect = (address: FormAddressType) => {
    this.setState({ selectedAddress: address });
    this.uncheckShippingAsBilling();
  };

  unselectAddress = () => {
    if (this.state.selectedAddress && this.props.shippingAsBilling) {
      this.setState({ selectedAddress: null });
    }
  };

  uncheckShippingAsBilling = () => {
    const { shippingAsBilling, update } = this.props;
    if (shippingAsBilling) {
      update({
        shippingAsBilling: false
      });
    }
  };

  handleAddressAdd = async (address: FormAddressType) => {
    await this.props.onSubmit(address);

    if (!this.props.errors.length) {
      this.updateAddresses(address);
    }
  };

  updateAddresses = (address: FormAddressType) => {
    if (address.asNew) {
      this.uncheckShippingAsBilling();
    }

    this.setState(prevState => ({
      addresses: [...prevState.addresses, address],
      ...(address.asNew && {
        selectedAddress: address
      }),
      isVisibleAddNewModalForm: false
    }));
  };

  render() {
    const { addresses, selectedAddress } = this.state;
    const {
      buttonText,
      errors,
      loading,
      proceedToNextStep,
      shippingAsBilling = false,
      type
    } = this.props;

    return (
      <>
        <AddressPicker
          addresses={addresses}
          billing={type === "billing"}
          errors={errors}
          loading={loading}
          onAddressSelect={this.handleAddressSelect}
          handleAddressAdd={this.handleAddressAdd}
          selectedAddress={selectedAddress}
          isVisibleAddNewModalForm={this.state.isVisibleAddNewModalForm}
          hideAddNewModalForm={this.hideAddNewModalForm}
          showAddNewModalForm={this.showAddNewModalForm}
        />
        <Button
          type="submit"
          disabled={(!selectedAddress && !shippingAsBilling) || loading}
          onClick={proceedToNextStep.bind(null, this.state.selectedAddress)}
        >
          {buttonText}
        </Button>
      </>
    );
  }
}

export default UserAddressSelector;
