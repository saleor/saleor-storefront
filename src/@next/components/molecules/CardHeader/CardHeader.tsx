import React from "react";

import { IconButton } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const CardHeader: React.FC<IProps> = ({
  children,
  prefix,
  closeIcon,
  divider = false,
  onHide,
  textStyle = "title",
  titleSize = "md",
}: IProps) => {
  const defaultCloseIcon = !!onHide && !closeIcon;

  return (
    <S.Wrapper divider={divider}>
      <S.Header>
        {prefix}
        {textStyle === "title" ? (
          <S.Title size={titleSize}>{children}</S.Title>
        ) : (
          <S.Paragraph>{children}</S.Paragraph>
        )}
      </S.Header>
      {defaultCloseIcon && (
        <IconButton
          name="x"
          size={19}
          onClick={onHide}
          testingContext="closeOverlayButton"
        />
      )}
      {closeIcon}
    </S.Wrapper>
  );
};
