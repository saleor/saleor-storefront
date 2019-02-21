import { uniqBy } from "lodash";
import React from "react";

import { User } from "../../../components/User/types/User";
import { maybe } from "../../../core/utils";
import { AddressPicker } from "../../components";
import { CheckoutContextInterface } from "../../context";
import { Address } from "../../types/Address";
import { Checkout } from "../../types/Checkout";

interface UserAddressSelectorProps {
  user: User;
  checkout: Checkout;
  shipping: boolean;
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
      addresses: uniqBy(addresses, "id"),
      selectedAddress: addresses[0]
    };
  }

  handleAddressSelect = (address: Address) => {
    this.setState({ selectedAddress: address });
  };

  render() {
    const { addresses, selectedAddress } = this.state;

    return (
      <AddressPicker
        selectedId={maybe(() => selectedAddress.id, null)}
        addresses={addresses}
        onSelect={this.handleAddressSelect}
        onAddNew={() => null}
      />
    );
  }
}

export default UserAddressSelector;
