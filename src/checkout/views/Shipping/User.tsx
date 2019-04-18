import { isEqual, uniqWith } from "lodash";
import React from "react";

import { Button } from "../../../components";
import { FormAddressType } from "../../../components/ShippingAddressForm/types";
import { AddressPicker } from "../../components";
import { Address } from "../../types/Address";
import { UserAddressSelectorProps, UserAddressSelectorState } from "./types";

class UserAddressSelector extends React.PureComponent<
  UserAddressSelectorProps,
  UserAddressSelectorState
> {
  constructor(props: UserAddressSelectorProps) {
    super(props);

    const {
      shipping,
      checkout,
      user: {
        addresses: userAddresses,
        defaultBillingAddress,
        defaultShippingAddress
      }
    } = props;
    const addresses = [
      ...(shipping
        ? [checkout.shippingAddress, defaultShippingAddress]
        : [checkout.billingAddress, defaultBillingAddress]),
      ...userAddresses
    ].filter(address => address);

    this.state = {
      addresses: uniqWith(addresses, isEqual),
      selectedAddress: addresses[0]
    };
  }

  handleAddressSelect = (address: FormAddressType) => {
    this.setState({ selectedAddress: address });
  };

  handleAddressAdd = (address: FormAddressType, select: boolean) => {
    this.setState(prevState => ({
      addresses: [...prevState.addresses, address],
      ...(select && { selectedAddress: address })
    }));
  };

  render() {
    const { addresses, selectedAddress } = this.state;
    const { onSubmit, loading } = this.props;

    return (
      <>
        <AddressPicker
          selectedAddress={selectedAddress}
          addresses={addresses}
          onSelect={this.handleAddressSelect}
          onAddNew={this.handleAddressAdd}
        />
        <Button
          type="submit"
          disabled={!selectedAddress || loading}
          onClick={() => onSubmit(selectedAddress)}
        >
          Continue to Shipping
        </Button>
      </>
    );
  }
}

export default UserAddressSelector;
