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
  options = [],
  disabledOptions = [],
  selectedOptions = [],
  hide,
  onSelect,
  show,
  target,
  footerTitle,
  onClickFooter,
}: IProps) => {
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    hide();
  });

  return (
    <Overlay
      position="right"
      duration={0}
      show={show}
      hide={hide}
      transparent
      target={target}
    >
      <S.Wrapper ref={setElementRef()}>
        <CardHeader divider onHide={hide}>
          <span>{title}</span>
        </CardHeader>
        <S.Content>
          {options.map(option => {
            const isSelected = selectedOptions.some(
              value => value === option.value
            );
            const isDisabled = disabledOptions.some(
              value => value === option.value
            );

            return (
              <S.Option key={option.value} disabled={isDisabled}>
                <OverlayItem
                  selected={isSelected}
                  disabled={isDisabled}
                  onClick={() => onSelect(option.value)}
                >
                  {option.label}
                </OverlayItem>
              </S.Option>
            );
          })}
        </S.Content>
        {footerTitle && (
          <S.Footer onClick={onClickFooter}>
            <ButtonLink color="secondary">
              <Trans id={footerTitle} />
            </ButtonLink>
          </S.Footer>
        )}
      </S.Wrapper>
    </Overlay>
  );
};
