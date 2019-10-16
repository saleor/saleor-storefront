import React from "react";
import { components } from "react-select";
import { ThemeContext } from "styled-components";

import { Icon, InputLabel, Select } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const InputSelect: React.FC<IProps> = ({ label, ...props }: IProps) => {
  const customTheme = React.useContext(ThemeContext);
  const secondaryColor = customTheme.colors.secondary;
  const borderColor = customTheme.input.border;

  const customStyles = {
    control: (provided: any, state: { menuIsOpen: any }) => ({
      ...provided,
      ":hover": {
        border: `1px solid ${secondaryColor}`,
        outlineColor: secondaryColor,
        outlineStyle: "solid",
        outlineWidth: "1px",
      },
      border: state.menuIsOpen
        ? `1px solid ${secondaryColor}`
        : `1px solid ${borderColor}`,
      borderRadius: 0,
      boxShadow: 0,
      boxSizing: "border-box",
      margin: 0,
      outline: state.menuIsOpen ? `1px solid ${secondaryColor}` : "",
      padding: "0.55rem 1rem",
    }),
    valueContainer: (provided: any) => {
      return {
        ...provided,
        padding: 0,
      };
    },
  };
  const customComponents = {
    Control: (props: any) => {
      const customTheme = React.useContext(ThemeContext);
      return (
        <>
          <components.Control {...{ customTheme, ...props }} />
          {
            <InputLabel
              labelBackground="#FFF"
              active={props.selectProps.menuIsOpen || props.hasValue}
            >
              {label}
            </InputLabel>
          }
        </>
      );
    },
    IndicatorSeparator: () => null,
    IndicatorsContainer: ({ selectProps }: any) => {
      return (
        // Boolean to string conversion done due to
        // https://github.com/styled-components/styled-components/issues/1198
        <S.Indicator rotate={String(selectProps.menuIsOpen)}>
          <Icon name="select_arrow" size={10} />
        </S.Indicator>
      );
    },
    Option: (props: any) => {
      const customTheme = React.useContext(ThemeContext);
      return <components.Option {...{ customTheme, ...props }} />;
    },
  };

  return (
    <Select
      customComponents={customComponents}
      {...props}
      customStyles={customStyles}
    />
  );
};
