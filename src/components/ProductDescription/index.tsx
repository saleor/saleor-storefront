import * as React from "react";

import { Button, SelectField, TextField } from "..";
import {
  ProductPriceInterface,
  ProductVariantInterface
} from "../../core/types";
import { priceToString } from "../../core/utils";

import "./scss/index.scss";

interface ProductDescriptionProps {
  productVariants: ProductVariantInterface[];
  name: string;
  price: ProductPriceInterface;
  locale?: string;
  children: React.ReactNode;
  addToCart(varinatId: string, quantity?: number): void;
}

interface ProductDescriptionState {
  primaryPicker?: { label: string; values: string[]; selected?: string };
  secondaryPicker?: { label: string; values: string[]; selected?: string };
  quantity: number;
  variants: { [x: string]: string[] };
}

class ProductDescription extends React.Component<
  ProductDescriptionProps,
  ProductDescriptionState
> {
  constructor(props) {
    super(props);
    const pickers =
      this.props.productVariants[0].attributes.length > 0 &&
      this.createPickers();
    this.state = {
      ...pickers,
      quantity: 1
    };
  }

  createPickers = () => {
    const primaryPicker = {
      label: this.props.productVariants[0].attributes[0].attribute.name,
      selected: "",
      values: []
    };

    let secondaryPicker;

    if (this.props.productVariants[0].attributes.length > 1) {
      secondaryPicker = {
        label: this.props.productVariants[0].attributes
          .slice(1)
          .map(attribute => attribute.attribute.name)
          .join(" / "),
        selected: "",
        values: []
      };
    }

    const variants = {};

    this.props.productVariants.map(variant => {
      if (!primaryPicker.values.includes(variant.attributes[0].value.value)) {
        primaryPicker.values.push(variant.attributes[0].value.value);
      }

      if (secondaryPicker) {
        const combinedValues = variant.attributes
          .slice(1)
          .map(attribute => attribute.value.value)
          .join(" / ");

        if (!secondaryPicker.values.includes(combinedValues)) {
          secondaryPicker.values.push(combinedValues);
        }

        if (variants[variant.attributes[0].value.value]) {
          variants[variant.attributes[0].value.value] = [
            ...variants[variant.attributes[0].value.value],
            combinedValues
          ];
        } else {
          variants[variant.attributes[0].value.value] = [combinedValues];
        }
      }

      primaryPicker.selected = primaryPicker.values[0];
      if (secondaryPicker) {
        secondaryPicker.selected = secondaryPicker.values[0];
      }
    });

    return {
      primaryPicker,
      secondaryPicker,
      variants
    };
  };

  onPrimaryPickerChange = value => {
    const primaryPicker = this.state.primaryPicker;
    primaryPicker.selected = value;
    this.setState({ primaryPicker });
    if (
      this.state.secondaryPicker &&
      !this.state.variants[value].includes(this.state.secondaryPicker.selected)
    ) {
      this.onSecondaryPickerChange("");
    }
  };

  onSecondaryPickerChange = value => {
    const secondaryPicker = this.state.secondaryPicker;
    secondaryPicker.selected = value;
    this.setState({ secondaryPicker });
  };

  handleSubmit = () => {
    let variant;
    if (!this.state.secondaryPicker && this.state.primaryPicker) {
      variant = this.props.productVariants.find(
        variant => variant.name === `${this.state.primaryPicker.selected}`
      ).id;
    } else if (this.state.secondaryPicker && this.state.primaryPicker) {
      variant = this.props.productVariants.find(
        variant =>
          variant.name ===
          `${this.state.primaryPicker.selected} / ${
            this.state.secondaryPicker.selected
          }`
      ).id;
    } else {
      variant = this.props.productVariants[0].id;
    }
    this.props.addToCart(variant, this.state.quantity);
  };

  render() {
    const { name, price, locale } = this.props;
    return (
      <div className="product-description">
        <h3>{name}</h3>
        <h4>{priceToString(price, locale)}</h4>
        <div className="product-description__variant-picker">
          {this.state.primaryPicker ? (
            <SelectField
              onChange={e => this.onPrimaryPickerChange(e.value)}
              label={this.state.primaryPicker.label}
              key={this.state.primaryPicker.label}
              value={{
                label: this.state.primaryPicker.selected,
                value: this.state.primaryPicker.selected
              }}
              options={this.state.primaryPicker.values.map(value => ({
                label: value,
                value
              }))}
            />
          ) : null}
          {this.state.secondaryPicker ? (
            <SelectField
              onChange={e => this.onSecondaryPickerChange(e.value)}
              label={this.state.secondaryPicker.label}
              key={this.state.secondaryPicker.label}
              value={
                this.state.secondaryPicker.selected && {
                  label: this.state.secondaryPicker.selected,
                  value: this.state.secondaryPicker.selected
                }
              }
              options={this.state.secondaryPicker.values.map(value => ({
                isDisabled: !this.state.variants[
                  this.state.primaryPicker.selected
                ].includes(value),
                label: value,
                value
              }))}
            />
          ) : null}
          <TextField
            type="number"
            label="Quantity"
            value={this.state.quantity || ""}
            onChange={e => this.setState({ quantity: Number(e.target.value) })}
          />
        </div>
        <div className="product-description__about">
          <h4>Description</h4>
          {this.props.children}
        </div>
        <Button
          className="product-description__action"
          onClick={this.handleSubmit}
          disabled={
            this.state.primaryPicker &&
            this.state.secondaryPicker &&
            this.state.secondaryPicker.selected === ""
          }
        >
          Add to cart
        </Button>
      </div>
    );
  }
}

export default ProductDescription;
