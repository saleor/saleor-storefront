import "./scss/index.scss";

import classNames from "classnames";
import React from "react";
import ReactSVG from "react-svg";

import {
  Modal,
  OverlayContext,
  OverlayTheme,
  OverlayType
} from "../../../components";
import AddressSummary from "../../../components/AddressSummary";
import { AddNewShippingAddressForm } from "../../../components/ShippingAddressForm";
import { FormAddressType } from "../../../components/ShippingAddressForm/types";
import { Option } from "../../components";

import plusSvg from "../../../images/plus.svg";

const Picker: React.SFC<{
  addresses: FormAddressType[];
  selectedAddress?: FormAddressType;
  onSelect: (address: FormAddressType) => void;
  onAddNew: (address: FormAddressType, select: boolean) => void;
}> = ({ addresses, selectedAddress, onSelect, onAddNew }) => (
  <div className="address-picker">
    {addresses.map((address, id) => (
      <div
        key={id}
        onClick={() => {
          onSelect(address);
        }}
        className={classNames("address-picker__address", {
          "address-picker__address--selected": selectedAddress === address
        })}
      >
        <AddressSummary address={address} />
        <Option
          selected={selectedAddress === address}
          value={`${id}`}
          label="Deliver to this address"
          onSelect={() => onSelect(address)}
        />
      </div>
    ))}
    {onAddNew && (
      <OverlayContext.Consumer>
        {overlay => (
          <div
            className="address-picker__address address-picker__address--add-new"
            onClick={() => {
              overlay.show(OverlayType.modal, OverlayTheme.modal, {
                content: (
                  <Modal
                    title="Add New Address"
                    loading={false}
                    formId={"new-address-form"}
                    hide={overlay.hide}
                    submitBtnText={"Save"}
                    cancelBtnText={"Cancel"}
                  >
                    <AddNewShippingAddressForm
                      loading={false}
                      errors={[]}
                      onSubmit={onAddNew}
                    />
                  </Modal>
                )
              });
            }}
          >
            <div>
              <ReactSVG path={plusSvg} />
              <p>Add new address</p>
            </div>
          </div>
        )}
      </OverlayContext.Consumer>
    )}
  </div>
);

export default Picker;
