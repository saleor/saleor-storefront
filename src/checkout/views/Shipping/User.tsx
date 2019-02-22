import { isEqual, uniqWith } from "lodash";
import React from "react";

import { Button } from "../../../components";
import { User } from "../../../components/User/types/User";
import { maybe } from "../../../core/utils";
import { AddressPicker } from "../../components";
import { CheckoutContextInterface } from "../../context";
import { Address } from "../../types/Address";
import { Checkout } from "../../types/Checkout";

interface UserAddressSelectorProps {
  loading: boolean;
  user: User;
  checkout: Checkout;
  shipping: boolean;
  onSubmit(selectedAddress: Address): void;
  update?(checkoutData: CheckoutContextInterface): Promise<void>;
}

interface UserAddressSelectorState {
  addresses: Address[];
  selectedAddress?: Address;
}

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

  handleAddressSelect = (address: Address) => {
    this.setState({ selectedAddress: address });
  };

  handleAddressAdd = (address: Address, select: boolean) => {
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
