import * as React from "react";
import { components } from "react-select";

import { SelectField, TextField } from "..";

import "./scss/index.scss";

class PriceRangeFilter extends React.Component<
  { locale?: string; changePriceFilter(from: number, to: number): void },
  { active: boolean; from: string; to: string }
> {
  filterRef: any;
  constructor(props) {
    super(props);
    this.state = { active: false, from: "", to: "" };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.state.from &&
        this.state.to &&
        this.state.from !== prevState.from) ||
      this.state.to !== prevState.to
    ) {
      this.props.changePriceFilter(
        Number(this.state.from),
        Number(this.state.to)
      );
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (this.filterRef && !this.filterRef.contains(event.target)) {
      this.setState({ active: false });
    }
  };

  render() {
    const Control = props => (
      <components.Control {...props} isFocused={this.state.active} />
    );

    return (
      <div
        className="price-filter"
        ref={node => (this.filterRef = node)}
        onClick={() => this.setState({ active: true })}
      >
        <SelectField
          placeholder="Price range"
          menuIsOpen={false}
          components={{ Control }}
          value={
            this.state.from &&
            this.state.to && {
              label: `${this.state.from} - ${this.state.to}`
            }
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
            onChange={e => this.setState({ from: e.target.value })}
          />
          <TextField
            type="number"
            placeholder="To"
            onChange={e => this.setState({ to: e.target.value })}
          />
        </div>
      </div>
    );
  }
}

export default PriceRangeFilter;
