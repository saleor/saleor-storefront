import classNames from "classnames";
import { map } from "lodash";
import * as React from "react";

import { ISelectItem, ISelectProps } from "./types";

const renderList = (
  list: ISelectItem,
  onValueChange: (key: string | number) => void
) =>
  map(list, ({ label, value }) => (
    <p key={value} onClick={() => onValueChange(value)}>
      {label}
    </p>
  ));

export const SelectBase = (props: ISelectProps) => {
  const [open, setOpen] = React.useState(false);
  const selectRef = React.useRef<HTMLElement>(null);

  const { clickedOutside, label, list, setElementRef, value } = props;

  const shouldOpen = clickedOutside ? false : open;

  const renderTitle = (list: ISelectItem) => list[value].label;

  const handleValueChange = (value: string) => {
    if (props.setFieldValue) {
      props.setFieldValue(props.name, value);
    }
    setOpen(false);
  };

  const renderLabel = (label?: string) => label && <label>{label}</label>;

  return (
    <div
      className={classNames("select", { "select--open": shouldOpen })}
      ref={setElementRef(selectRef)}
    >
      <input value={value} type="hidden" />
      <div>
        {renderLabel(label)}
        <div onClick={() => setOpen(!open)}> {renderTitle(list)} </div>
        <div
          className={classNames("select__options", {
            "select__options--open": shouldOpen
          })}
        >
          {renderList(list, handleValueChange)}
        </div>
      </div>
    </div>
  );
};

const Select = SelectBase;
export default Select;
