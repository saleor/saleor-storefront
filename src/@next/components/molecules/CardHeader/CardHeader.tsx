import React from "react";

import { Icon } from "@components/atoms";

import * as S from "./styles";
import { IProps, TextStyle, TitleSize } from "./types";

const renderCloseIcon = () => <Icon name="x" size={19} />;
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
  const Text = textStyle === "title" ? S.Title : S.Paragraph;
  return (
    <S.Header divider={divider}>
      <Text {...getTitleProps(textStyle, titleSize)}>{children}</Text>
      {onHide && <S.CloseBtn onClick={onHide}>{renderCloseIcon()}</S.CloseBtn>}
      {customIcon && <S.CloseBtn>{customIcon}</S.CloseBtn>}
    </S.Header>
  );
};
