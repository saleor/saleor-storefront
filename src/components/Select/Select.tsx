import { map } from "lodash";
import * as React from "react";

interface ISelectItem {
  [key: string]: {
    label: string;
    value: string;
  };
}

export interface ISelectProps {
  clickedOutside: boolean;
  label?: string;
  value: string;
  list: ISelectItem;
  name: string;
  setElementRef: (
    el: React.RefObject<HTMLElement>
  ) => React.RefObject<HTMLDivElement>;
  setFieldValue?(field: string, value: string | number): void;
}

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

  const renderLabel = (label?: string) => label && <p>{label}</p>;

  return (
    <div ref={setElementRef(selectRef)}>
      <div>
        {renderLabel(label)}
        <div onClick={() => setOpen(!open)}> {renderTitle(list)} </div>
        <div>{renderList(list, handleValueChange)}</div>
      </div>
    </div>
  );
};

const Select = SelectBase;
export default Select;
