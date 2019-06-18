import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const Input: React.FC<IProps> = ({
  onBlur,
  onFocus,
  contentLeft = null,
  contentRight = null,
  error = false,
  disabled = false,
  ...props
}: IProps) => {
  const [active, setActive] = React.useState(false);

  const handleFocus = React.useCallback(
    e => {
      setActive(true);
      if (onFocus) {
        onFocus(e);
      }
    },
    [setActive, onFocus]
  );
  const handleBlur = React.useCallback(
    e => {
      setActive(false);
      if (onFocus) {
        onFocus(e);
      }
    },
    [setActive, onBlur]
  );

  return (
    <S.Wrapper active={active} error={error} disabled={disabled}>
      <S.Content marginPosition="right">{contentLeft}</S.Content>
      <S.Input
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
      />
      <S.Content marginPosition="left">{contentRight}</S.Content>
    </S.Wrapper>
  );
};
