import "./scss/index.scss";

import classNames from "classnames";
import { filter, find } from "lodash";
import * as React from "react";

import { useClickedOutside } from "../../hooks";
import {
  IFilteredListArgs,
  IListArgs,
  ISelectChange,
  ISelectItem,
  ISelectProps
} from "./types";

const updateOptions = (
  { label, value }: ISelectItem,
  onChange: ISelectChange
) => onChange({ country: label, code: value });

const renderNoOptions = () => (
  <p className="select__option select__option--disabled" key="no-option">
    {"No Options"}
  </p>
);

const renderList = (
  { options, onChange }: IListArgs,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) =>
  options.length
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
    : renderNoOptions();

const filterList = ({ searchPhrase, options }: IFilteredListArgs) =>
  filter(options, ({ label }) =>
    label.toLowerCase().includes(searchPhrase.toLowerCase())
  );

const isAutofilled = (inputValue: string, newInputValue: string) =>
  newInputValue.length > 1 &&
  newInputValue.substring(0, newInputValue.length - 1) !== inputValue;

const findAutofilledOption = (options: ISelectItem[], inputValue: string) =>
  find(
    options,
    ({ label }) => label.toLowerCase() === inputValue.toLowerCase()
  );

export const Select = (props: ISelectProps) => {
  const { autoComplete, defaultValue, label, onChange, options, name } = props;

  const [open, setOpen] = React.useState(false);
  const [searchPhrase, setSearchPhrase] = React.useState(defaultValue.label);
  const { clickedOutside, setElementRef } = useClickedOutside();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const resetInputValueToDefault = () => setSearchPhrase(defaultValue.label);

  React.useEffect(() => {
    resetInputValueToDefault();
  }, [clickedOutside, defaultValue]);

  const shouldOpen = clickedOutside ? false : open;
  const shouldSearch = defaultValue.label !== searchPhrase;

  const renderLabel = (label?: string) =>
    label && <label className="input__label">{label}</label>;

  const changeSelectionRange = (e: React.ChangeEvent<any>) =>
    inputRef.current.setSelectionRange(0, e.target.value.length);

  return (
    <div
      ref={setElementRef()}
      className={classNames("react-select select", {
        "select--open": shouldOpen
      })}
    >
      <input
        className="select__hidden"
        autoComplete={autoComplete}
        name={name}
        defaultValue={defaultValue.value}
      />
      <div>
        {renderLabel(label)}
        <div className="select__title">
          <input
            ref={inputRef}
            value={searchPhrase}
            onChange={e => {
              const { value } = e.target;
              setSearchPhrase(value);
              if (isAutofilled(searchPhrase, value)) {
                const country = findAutofilledOption(options, value);
                return country && updateOptions(country, onChange);
              }
            }}
            onClick={e => {
              changeSelectionRange(e);
              if (open) {
                resetInputValueToDefault();
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

export default Select;
