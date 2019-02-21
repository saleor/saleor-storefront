import "./scss/index.scss";

import classNames from "classnames";
import React from "react";
import ReactSVG from "react-svg";

import AddressSummary from "../../../components/AddressSummary";
import { Option } from "../../components";
import { Address } from "../../types/Address";

import plusSvg from "../../../images/plus.svg";

const Picker: React.FC<{
  addresses: Address[];
  selectedId: string | null;
  onSelect(address: Address): void;
  onAddNew?(address: Address): void;
}> = ({ addresses, selectedId, onSelect, onAddNew }) => (
  <div className="address-picker">
    {addresses.map(address => (
      <div
        key={address.id}
        onClick={() => onSelect(address)}
        className={classNames("address-picker__address", {
          "address-picker__address--selected": selectedId === address.id
        })}
      >
        <AddressSummary address={address} />
        <Option
          selected={selectedId === address.id}
          value={`${address.id}`}
          label="Deliver to this address"
        />
      </div>
    ))}
    {onAddNew && (
      <div className="address-picker__address address-picker__address--add-new">
        <div>
          <ReactSVG path={plusSvg} />
          <p>Add new address</p>
        </div>
      </div>
    )}
  </div>
);

export default Picker;
