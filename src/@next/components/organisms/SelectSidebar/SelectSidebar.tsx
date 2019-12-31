import { Trans } from "@lingui/react";
import React from "react";

import { ButtonLink } from "@components/atoms";
import { CardHeader, OverlayItem } from "@components/molecules";
import { useHandlerWhenClickedOutside } from "@hooks";

import { Overlay } from "../";
import * as S from "./styles";
import { IProps } from "./types";

export const SelectSidebar: React.FC<IProps> = ({
  title,
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
        <CardHeader divider onHide={hide}>
          <span>{title}</span>
        </CardHeader>
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
        <S.Footer>
          <ButtonLink color="secondary">
            <Trans id="Show size table" />
          </ButtonLink>
        </S.Footer>
      </S.Wrapper>
    </Overlay>
  );
};
