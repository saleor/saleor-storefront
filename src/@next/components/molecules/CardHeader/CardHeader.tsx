import React from "react";

import { IconButton } from "@components/atoms";

import * as S from "./styles";
import { IProps, TextStyle, TitleSize } from "./types";

const getTitleProps = (style: TextStyle, size: TitleSize) =>
  style === "title" && {
    size,
  };

export const CardHeader: React.FC<IProps> = ({
  children,
  customIcon,
  divider = false,
  onHide,
  textStyle = "title",
  titleSize = "md",
}: IProps) => {
  const withCloseIcon = !!onHide && !customIcon;
  const Text = textStyle === "title" ? S.Title : S.Paragraph;
  return (
    <S.Header divider={divider}>
      <Text {...getTitleProps(textStyle, titleSize)}>{children}</Text>
      {withCloseIcon && <IconButton name="x" size={19} onClick={onHide} />}
      {customIcon}
    </S.Header>
  );
};
