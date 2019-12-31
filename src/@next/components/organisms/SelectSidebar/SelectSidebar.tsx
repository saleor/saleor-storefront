import React from "react";

import { IconButton } from "@components/atoms";
import { OverlayItem } from "@components/molecules";
import { useHandlerWhenClickedOutside } from "@hooks";

import { Overlay } from "../";
import * as S from "./styles";
import { IProps } from "./types";

export const SelectSidebar: React.FC<IProps> = ({
  values,
  hide,
  onSelect,
  show,
  target,
  ...props
}: IProps) => {
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    hide();
  });

  return (
    <Overlay
      duration={0}
      position="right"
      show={show}
      hide={hide}
      transparent
      target={target}
    >
      <S.Wrapper ref={setElementRef()}>
        {" "}
        <S.Header>
          <span>PLEASE SELECT SIZE</span>
          <IconButton onClick={hide} name="x" size={18} color="000" />
        </S.Header>
        {values.map(value => {
          return (
            <S.SelectOption>
              <OverlayItem
                selected={value.selected}
                onClick={() => onSelect(value)}
              >
                {value.label}
              </OverlayItem>
            </S.SelectOption>
          );
        })}
      </S.Wrapper>
    </Overlay>
  );
};
