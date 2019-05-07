import * as React from "react";

import { ISelectOptionsList } from "./customTypes";

const renderNoOptions = () => (
  <p className="select__option select__option--disabled" key="no-option">
    {"No Options"}
  </p>
);

const SelectOptionsList: React.FC<ISelectOptionsList> = ({
  options,
  onChange,
  setOpen,
  updateOptions
}) => (
  <>
    {options.length
      ? options.map(({ label, value }) => (
          <p
            className="select__option"
            key={value}
            onClick={() => {
              updateOptions({ label, value }, onChange);
              setOpen(false);
            }}
          >
            {label}
          </p>
        ))
      : renderNoOptions()}
  </>
);

export default SelectOptionsList;
