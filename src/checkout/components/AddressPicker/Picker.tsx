import "./scss/index.scss";

import classNames from "classnames";
import React from "react";
import ReactSVG from "react-svg";

import { OverlayContext, OverlayTheme, OverlayType } from "../../../components";
import AddressSummary from "../../../components/AddressSummary";
import { Option } from "../../components";
import { Address } from "../../types/Address";
import AddNewAddressModal from "./Modal";

import plusSvg from "../../../images/plus.svg";

const Picker: React.FC<{
  addresses: Address[];
  selectedAddress?: Address;
  onSelect(address: Address): void;
  onAddNew?(address: Address, select: boolean): void;
}> = ({ addresses, selectedAddress, onSelect, onAddNew }) => (
  <div className="address-picker">
    {addresses.map((address, id) => (
      <div
        key={id}
        onClick={() => onSelect(address)}
        className={classNames("address-picker__address", {
          "address-picker__address--selected": selectedAddress === address
        })}
      >
        <AddressSummary address={address} />
        <Option
          selected={selectedAddress === address}
          value={`${id}`}
          label="Deliver to this address"
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
                  <AddNewAddressModal onAddNew={onAddNew} hide={overlay.hide} />
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
