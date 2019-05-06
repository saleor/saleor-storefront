import "./scss/index.scss";

import classNames from "classnames";
import { filter, map } from "lodash";
import * as React from "react";

import { useClickedOutside } from "../../hooks";
import { IFilteredListArgs, IListArgs, ISelectProps } from "./types";

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
    ? map(options, ({ label, value }) => (
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
      ))
    : renderNoOptions();

const filterList = ({ searchPhrase, options }: IFilteredListArgs) =>
  filter(options, ({ label }) =>
    label.toLowerCase().includes(searchPhrase.toLowerCase())
  );

export const Select = (props: ISelectProps) => {
  const { defaultValue, label, onChange, options, name } = props;

  const [open, setOpen] = React.useState(false);
  const [searchPhrase, setSearchPhrase] = React.useState(defaultValue.label);
  const { clickedOutside, setElementRef } = useClickedOutside();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setSearchPhrase(defaultValue.label);
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
              changeSelectionRange(e);
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

export default Select;
