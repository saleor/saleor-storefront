import React from "react";

import { CardHeader } from "@components/molecules";
import { Overlay } from "@components/organisms";

import * as S from "./styles";
import { IProps } from "./types";

export const SidebarModal: React.FC<IProps> = ({
  children,
  hide,
  position = "right",
  show,
  target,
  title,
}: IProps) => {
  return (
    <Overlay position={position} show={show} hide={hide} target={target}>
      <S.Sidebar>
        {title && <CardHeader onHide={hide}>{title}</CardHeader>}
        <S.Content>{children}</S.Content>
      </S.Sidebar>
    </Overlay>
  );
};
