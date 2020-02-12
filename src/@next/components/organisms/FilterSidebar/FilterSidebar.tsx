import React from "react";

import { IconButton } from "@components/atoms";
import { FilterAttribute } from "@components/molecules";
import { useHandlerWhenClickedOutside } from "@hooks";

import { Overlay } from "../";
import * as S from "./styles";
import { IProps } from "./types";

export const FilterSidebar: React.FC<IProps> = ({
  hide,
  filters,
  show,
  attributes,
  target,
  ...props
}: IProps) => {
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    hide();
  });
  return (
    <Overlay
      duration={0}
      position="left"
      show={show}
      hide={hide}
      transparent
      target={target}
    >
      <S.Wrapper ref={setElementRef()}>
        <S.Header>
          <span>FILTERS</span>
          <IconButton onClick={hide} name="x" size={18} color="000" />
        </S.Header>
        {attributes.map(attribute => {
          return (
            <FilterAttribute
              {...{
                attribute,
                filters,
                ...props,
              }}
            />
          );
        })}
      </S.Wrapper>
    </Overlay>
  );
};
