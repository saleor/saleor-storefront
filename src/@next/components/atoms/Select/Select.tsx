import React from "react";
import ReactSelect, { components } from "react-select";

import { ThemeContext } from "styled-components";
import { Icon } from "../Icon";

import * as S from "./styles";

const Option = (props: any) => {
  const customTheme = React.useContext(ThemeContext);
  return <components.Option {...{ customTheme, ...props }} />;
};

const ControlWrapper = (props: any) => {
  const customTheme = React.useContext(ThemeContext);
  return (
    <>
      <components.Control {...{ customTheme, ...props }} />
      {props.label && (
        <S.Label
          bgColor="#FFF"
          active={props.selectProps.menuIsOpen || props.hasValue}
        >
          {props.label}
        </S.Label>
      )}
    </>
  );
};

const customStyles = {
  control: (provided: any, state: { menuIsOpen: any }) => ({
    ...provided,
    ":hover": {
      border: "1px solid #21125E",
      outlineColor: "#21125e",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    border: state.menuIsOpen ? "1px solid #21125e" : "1px solid #323232",
    borderRadius: 0,
    boxShadow: 0,
    boxSizing: "border-box",
    margin: 0,
    outline: state.menuIsOpen ? "1px solid #21125e" : "",
    padding: "0.55rem 1rem",
  }),
  option: (
    provided: any,
    state: {
      isSelected: any;
      isFocused: boolean;
      customTheme: any;
    }
  ) => {
    return {
      ...provided,
      alignItems: "center",
      backgroundColor: state.isSelected
        ? state.customTheme.colors.primaryLight
        : state.isFocused
        ? state.customTheme.colors.primaryTransparent
        : "white",
      borderRadius: "8px",
      color: state.customTheme.colors.dark,
      display: "flex",
      fontWeight:
        state.isSelected && state.customTheme.typography.boldFontWeight,
      margin: "0.5rem auto",
      minHeight: "34px",
      padding: "0.25rem",
      verticalAlign: "middle",
      width: "90%",
    };
  },
  valueContainer: (provided: any) => {
    return {
      ...provided,
      padding: 0,
    };
  },
};

export const Select: React.FC<{
  value: any;
  name: string;
  label?: string;
  options?: any[];
  autoComplete?: string;
  defaultValue?: any;
  onChange?: (name: string, value: string) => void;
}> = ({ value, onChange, name, options, label, defaultValue }) => {
  const handleChange = (value: any) => {
    if (onChange) {
      onChange(name, value);
    }
  };
  return (
    <S.Wrapper>
      <ReactSelect
        defaultValue={defaultValue}
        onChange={handleChange}
        value={value}
        isClearable={false}
        menuShouldScrollIntoView={true}
        tabSelectsValue={false}
        getOptionLabel={option => option.country}
        getOptionValue={option => option.code}
        openMenuOnFocus={true}
        styles={customStyles}
        options={options}
        placeholder={""}
        components={{
          Control: props => <ControlWrapper {...{ label, ...props }} />,
          IndicatorSeparator: () => null,
          IndicatorsContainer: ({ selectProps }) => {
            return (
              // Boolean to string conversion done due to
              // https://github.com/styled-components/styled-components/issues/1198
              <S.Indicator rotate={String(selectProps.menuIsOpen)}>
                <Icon name="select_arrow" size={10} />
              </S.Indicator>
            );
          },
          Option: props => <Option {...props} />,
        }}
      ></ReactSelect>
    </S.Wrapper>
  );
};
