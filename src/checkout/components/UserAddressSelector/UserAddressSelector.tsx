import { get, isEqual, map, uniqWith } from "lodash";
import React from "react";

import { Button, Error } from "../../../components";
import { FormAddressType } from "../../../components/ShippingAddressForm/types";
import { FormError } from "../../../core/types";
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
        ? [get(checkout, "shippingAddress"), defaultShippingAddress]
        : [get(checkout, "billingAddress"), defaultBillingAddress]),
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

  handleAddressAdd = (callback: () => void) => (address: FormAddressType) => {
    this.setState(prevState => ({
      addresses: [...prevState.addresses, address],
      ...(address.asNew && { selectedAddress: address })
    }));
    callback();
  };

  renderErrors = (errors: [] | FormError[]) =>
    map(errors, (error, index) => (
      <p key={index}>
        <Error error={error.message} />
      </p>
    ));

  render() {
    const { addresses, selectedAddress } = this.state;
    const { buttonText, errors, onSubmit, loading } = this.props;

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
          {buttonText}
        </Button>
        {this.renderErrors(errors)}
      </>
    );
  }
}

export default UserAddressSelector;
