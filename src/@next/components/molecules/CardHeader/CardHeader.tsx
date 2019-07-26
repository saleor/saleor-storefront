import React from "react";

import { IconButton } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const CardHeader: React.FC<IProps> = ({
  children,
  customIcon,
  divider = false,
  onHide,
  textStyle = "title",
  titleSize = "md",
}: IProps) => {
  const withCloseIcon = !!onHide && !customIcon;

  return (
    <S.Header divider={divider}>
      {textStyle === "title" ? (
        <S.Title size={titleSize}>{children}</S.Title>
      ) : (
        <S.Paragraph>{children}</S.Paragraph>
      )}
      {withCloseIcon && <IconButton name="x" size={19} onClick={onHide} />}
      {customIcon}
    </S.Header>
  );
};
