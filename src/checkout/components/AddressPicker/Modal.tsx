import * as React from "react";
import ReactSVG from "react-svg";

import { Button, Form, SelectField, TextField } from "../../../components";
import { ShopContext } from "../../../components/ShopProvider/context";

import closeImg from "../../../images/modal-close.svg";
import { Address } from "../../types/Address";

export interface NewAddressI extends Address {
  email: string;
}

const AddNewAddressModal: React.FC<{
  hide(): void;
  onAddNew(address: Address, select: boolean): void;
}> = ({ hide, onAddNew }) => (
  <ShopContext.Consumer>
    {({ countries, geolocalization, defaultCountry }) => (
      <div className="modal">
        <Form
          data={{
            country: {
              code: geolocalization.country
                ? geolocalization.country.code
                : defaultCountry.code,
              country: geolocalization.country
                ? geolocalization.country.country
                : defaultCountry.country
            }
          }}
          onSubmit={(evt, data) => {
            evt.preventDefault();
            const { asNew, ...address } = data;
            // TODO Fix types
            onAddNew(address as any, asNew as any);
            hide();
          }}
        >
          <div className="modal__title">
            <p>Add new address</p>
            <ReactSVG path={closeImg} className="modal__close" onClick={hide} />
          </div>
          <div className="modal__body">
            <TextField
              label="Email Address"
              type="email"
              autoComplete="email"
              name="email"
            />
            <TextField
              label="Phone number"
              type="tel"
              name="phone"
              autoComplete="tel"
            />
            <TextField
              label="First Name"
              type="given-name"
              name="firstName"
              autoComplete="given-name"
            />
            <TextField
              label="Last Name"
              type="family-name"
              name="lastName"
              autoComplete="family-name"
            />
            <TextField
              label="Company"
              type="organization"
              name="companyName"
              autoComplete="organization"
            />
            <TextField
              label="Street Name"
              type="address-line1"
              name="streetAddress1"
              autoComplete="address-line1"
            />
            <TextField
              label="House / Apt Number"
              type="address-line2"
              name="streetAddress2"
              autoComplete="address-line2"
            />
            <TextField
              label="Zip-Code"
              type="postal-code"
              name="postalCode"
              autoComplete="postal-code"
            />
            <TextField
              label="City"
              type="city"
              name="city"
              autoComplete="address-level2"
            />
            <TextField
              label="State/Province"
              type="state"
              name="countryArea"
              autoComplete="address-level1"
            />
            <SelectField
              label="Country"
              name="country"
              options={countries.map(country => ({
                label: country.country,
                value: country.code
              }))}
            />
            <label className="checkbox">
              <input name="asNew" type="checkbox" />
              <span>Use this address as new shipping address</span>
            </label>
          </div>
          <div className="modal__footer">
            <a>Cancel</a>
            <Button type="submit" className="modal__button">
              Ok
            </Button>
          </div>
        </Form>
      </div>
    )}
  </ShopContext.Consumer>
);

export default AddNewAddressModal;
