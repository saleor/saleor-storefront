import * as React from "react";
import { components } from "react-select";

import { getValueOrEmpty } from "../../core/utils";
import { SelectField, TextField } from "..";

import "./scss/index.scss";

interface PriceRangeFilterProps {
  from: number;
  to: number;
  onChange: (field: "priceLte" | "priceGte", value: number) => void;
}

interface PriceRangeFilterState {
  active: boolean;
}

class PriceRangeFilter extends React.Component<
  PriceRangeFilterProps,
  PriceRangeFilterState
> {
  filterRef = React.createRef<HTMLDivElement>();

  state: PriceRangeFilterState = {
    active: false,
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickAway);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickAway);
  }

  handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({ active: true });
    event.stopPropagation();
  };

  handleClickAway = (event: Event) => {
    if (
      this.state.active &&
      !this.filterRef.current.contains(event.target as Node)
    ) {
      this.setState({ active: false });
    }
  };

  createLabel() {
    const { from, to } = this.props;
    if (!!from && !!to) {
      return `${from} - ${to}`;
    }
    if (from) {
      return `from ${from}`;
    }
    if (to) {
      return `to ${to}`;
    }
    return undefined;
  }

  render() {
    const Control = props => (
      <components.Control {...props} isFocused={this.state.active} />
    );

    const { from, onChange, to } = this.props;

    return (
      <div
        className="price-filter"
        ref={this.filterRef}
        onClick={this.handleClick}
      >
        <SelectField
          placeholder="Price range"
          menuIsOpen={false}
          components={{ Control }}
          value={
            this.createLabel()
              ? {
                  label: this.createLabel(),
                  value: "",
                }
              : undefined
          }
        />
        <div
          className={`price-filter__dropdown${
            this.state.active ? " price-filter__dropdown--visible" : ""
          }`}
        >
          <TextField
            type="number"
            placeholder="From"
            onChange={event => onChange("priceGte", event.target.value as any)}
            value={getValueOrEmpty(from)}
          />
          <TextField
            type="number"
            placeholder="To"
            onChange={event => onChange("priceLte", event.target.value as any)}
            value={getValueOrEmpty(to)}
          />
        </div>
      </div>
    );
  }
}

export default PriceRangeFilter;
