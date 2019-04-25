import "./scss/index.scss";

import classNames from "classnames";
import React from "react";
import ReactSVG from "react-svg";

import { Modal } from "../../../components";
import AddressSummary from "../../../components/AddressSummary";
import { AddNewShippingAddressForm } from "../../../components/ShippingAddressForm";
import { FormAddressType } from "../../../components/ShippingAddressForm/types";
import { Option } from "../../components";
import { IAddressPickerProps, IAddressPickerState } from "../../types";

import plusSvg from "../../../images/plus.svg";

class AddressPicker extends React.Component<
  IAddressPickerProps,
  IAddressPickerState
> {
  readonly state = {
    showModal: false
  };

  onSubmitHandler = (data: FormAddressType) => {
    this.props.onSubmit(data).then(response => {
      const hasErrors = response.errors.length;
      this.setState({ showModal: !!hasErrors });
      if (!hasErrors) {
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
      loading={this.props.loading}
      formId="new-address-form"
      hide={() => this.changeModalVisibility(false)}
      submitBtnText="Add Address"
      cancelBtnText="Cancel"
    >
      <AddNewShippingAddressForm
        billing={this.props.billing}
        loading={this.props.loading}
        errors={this.props.errors}
        onSubmit={this.onSubmitHandler}
      />
    </Modal>
  );

  changeModalVisibility = (showModal: boolean) => this.setState({ showModal });

  render() {
    return (
      <div className="address-picker">
        {this.renderAddressesList()}
        <div
          className="address-picker__address address-picker__address--add-new"
          onClick={() => this.changeModalVisibility(true)}
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
