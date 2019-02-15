import "./scss/index.scss";

import classNames from "classnames";
import React from "react";

const Option: React.FC<{
  value: string;
  label: string;
  onSelect: () => void;
  selected?: boolean;
}> = ({ value, label, selected, onSelect, children }) => (
  <>
    <div
      className={classNames("c-option", {
        "c-option--selected": selected
      })}
      onClick={onSelect}
    >
      <input type="radio" name="shippingOprtions" value={value} />
      <label>{label}</label>
    </div>
    {selected && children && (
      <div className="c-option__content">{children}</div>
    )}
  </>
);

Option.defaultProps = {
  selected: false
};

export default Option;
