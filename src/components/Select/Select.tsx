import "./scss/index.scss";

import classNames from "classnames";
import { filter, map } from "lodash";
import * as React from "react";

import { useClickedOutside } from "../../hooks";
import { IFilteredListArgs, IListArgs, ISelectProps } from "./types";

const renderList = ({ options, onChange }: IListArgs, setOpen: any) =>
  map(options, ({ label, value }) => (
    <p
      className="select__option"
      key={value}
      onClick={() => {
        onChange({ country: label, code: value });
        setOpen(false);
      }}
    >
      {label}
    </p>
  ));

const filterList = ({ searchPhrase, options }: IFilteredListArgs) =>
  filter(options, ({ label }) =>
    label.toLowerCase().includes(searchPhrase.toLowerCase())
  );

export const SelectBase = (props: ISelectProps) => {
  const { defaultValue, label, onChange, options, name } = props;

  const [open, setOpen] = React.useState(false);
  const [searchPhrase, setSearchPhrase] = React.useState(defaultValue.label);
  const { clickedOutside, setElementRef } = useClickedOutside();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setSearchPhrase(defaultValue.label);
  }, [defaultValue]);

  const shouldOpen = clickedOutside ? false : open;
  const shouldSearch = defaultValue.label !== searchPhrase;

  const renderLabel = (label?: string) =>
    label && <label className="input__label">{label}</label>;

  const resetInput = (e: any) => {
    const len = e.target.value.length;
    e.target.setSelectionRange(0, len);
    inputRef.current.focus();
  };

  return (
    <div
      ref={setElementRef()}
      className={classNames("react-select select", {
        "select--open": shouldOpen
      })}
    >
      <input
        className="select__hidden"
        name={name}
        defaultValue={defaultValue.value}
      />
      <div>
        {renderLabel(label)}
        <div className="select__title">
          <input
            ref={inputRef}
            value={searchPhrase}
            onChange={e => setSearchPhrase(e.target.value)}
            onClick={e => {
              resetInput(e);
              if (open) {
                setSearchPhrase(defaultValue.label);
              }
              setOpen(!open);
            }}
          />
        </div>

        <div
          className={classNames("select__options", {
            "select__options--open": shouldOpen
          })}
        >
          {renderList(
            {
              onChange,
              options: shouldSearch
                ? filterList({ searchPhrase, options })
                : options
            },
            setOpen
          )}
        </div>
      </div>
    </div>
  );
};

const Select = SelectBase;
export default Select;
