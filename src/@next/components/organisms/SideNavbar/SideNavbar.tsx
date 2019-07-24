import React from "react";

import { Overlay } from "../";
import * as S from "./styles";
import { IProps } from "./types";

export const SideNavbar: React.FC<IProps> = ({
  show,
  onHide,
  items,
  target,
}: IProps) => {
  return (
    <Overlay
      position="left"
      show={show}
      hide={() => onHide(false)}
      target={target}
    >
      <S.Wrapper>
        <S.Bar />
        <S.Menu>
          {items.map(item => (
            <S.Item>
              <S.Link item={item} type="side" fullWidth />
            </S.Item>
          ))}
        </S.Menu>
      </S.Wrapper>
    </Overlay>
  );
};
