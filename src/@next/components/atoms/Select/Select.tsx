import React, { useEffect, useRef, useState } from "react";

import { Icon, Input } from "..";
import { useHandlerWhenClickedOutside } from "../../../hooks";

import { SelectOptionsList } from "./SelectOptionsList";
import * as S from "./styles";
import { IProps } from "./types";

const filterOptions = (
  searchValue: string,
  options: string[],
  shouldFilter: boolean
) => {
  if (shouldFilter && searchValue) {
    return options.filter(element => {
      return element.toLowerCase().includes(searchValue.toLowerCase())
        ? element
        : "";
    });
  } else {
    return options;
  }
};

export const Select: React.FC<IProps> = ({
  options,
  defaultValue,
  label,
}: IProps) => {
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue || "");
  const [searchValue, setSearchValue] = useState("");
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setOpen(false);
  });

  const activeOptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeOptionRef.current && isOpen) {
      activeOptionRef.current.scrollIntoView();
      activeOptionRef.current.focus();
    }
  }, [isOpen]);

  const saveValue = (option: string) => {
    setOpen(false);
    setValue(option);
  };

  const shouldFilter = value !== searchValue;
  const filteredOptions = filterOptions(searchValue, options, shouldFilter);

  return (
    <S.Wrapper
      onClick={() => {
        setOpen(!isOpen);
        setSearchValue(value);
      }}
      ref={setElementRef()}
    >
      <Input
        label={label}
        value={isOpen ? searchValue : value}
        onChange={e => {
          setOpen(true);
          setSearchValue(e.target.value);
        }}
        contentRight={
          <S.SelectIcon isOpen={isOpen}>
            <Icon name="select_arrow" size={10} />
          </S.SelectIcon>
        }
      />
      {isOpen && (
        <S.SelectOptionsMenu>
          <SelectOptionsList
            ref={activeOptionRef}
            options={filteredOptions}
            selected={value}
            onClick={saveValue}
          />
        </S.SelectOptionsMenu>
      )}
    </S.Wrapper>
  );
};
