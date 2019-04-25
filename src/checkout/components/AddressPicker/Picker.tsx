import "./scss/index.scss";

import classNames from "classnames";
import React from "react";
import ReactSVG from "react-svg";

import { Modal } from "../../../components";
import AddressSummary from "../../../components/AddressSummary";
import { AddNewShippingAddressForm } from "../../../components/ShippingAddressForm";
import { FormAddressType } from "../../../components/ShippingAddressForm/types";
import { findFormErrors } from "../../../core/utils";
import { Option } from "../../components";
import { IAddressPickerProps, IAddressPickerState } from "../../types";

import plusSvg from "../../../images/plus.svg";

class AddressPicker extends React.Component<
  IAddressPickerProps,
  IAddressPickerState
> {
  readonly state = {
    errors: [],
    loading: false,
    showModal: false
  };

  onSubmitHandler = (data: FormAddressType) => {
    this.setState({ loading: true });

    this.props.onSubmit(data).then(response => {
      const errors = findFormErrors(response);
      this.setState({ loading: false, errors, showModal: !!errors.length });
      if (!errors.length) {
        this.props.onAddNew(data);
      }
    });
  };

  renderAddressesList = () =>
    this.props.addresses.map((address, id) => {
      const isSelected = this.props.selectedAddress === address;
      return (
        <div
          key={id}
          onClick={() => {
            this.props.onSelect(address);
          }}
          className={classNames("address-picker__address", {
            "address-picker__address--selected": isSelected
          })}
        >
          <AddressSummary address={address} />
          <Option
            selected={isSelected}
            value={`${id}`}
            label="Deliver to this address"
          />
        </div>
      );
    });

  renderModalForm = () => (
    <Modal
      show={this.state.showModal}
      title="Add New Address"
      loading={this.state.loading}
      formId="new-address-form"
      hide={this.hideModal}
      submitBtnText="Add Address"
      cancelBtnText="Cancel"
    >
      <AddNewShippingAddressForm
        billing={this.props.billing}
        loading={false}
        errors={this.state.errors}
        onSubmit={this.onSubmitHandler}
      />
    </Modal>
  );

  hideModal = () => this.setState({ showModal: false });
  showModal = () => this.setState({ showModal: true });

  render() {
    return (
      <div className="address-picker">
        {this.renderAddressesList()}
        <div
          className="address-picker__address address-picker__address--add-new"
          onClick={this.showModal}
        >
          <div>
            <ReactSVG path={plusSvg} />
            <p>Add address</p>
          </div>
        </div>
        {this.renderModalForm()}
      </div>
    );
  }
}

export default AddressPicker;
