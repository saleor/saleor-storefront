import React, { useState } from "react";

import { useHandlerWhenClickedOutside } from "@hooks";

import * as S from "./styles";
import { IProps, MenuItem } from "./types";

export const DropdownMenu: React.FC<IProps> = ({
  header,
  content,
  type,
}: IProps) => {
  const [visible, setVisible] = useState(false);
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setVisible(false);
  });
  return (
    <S.Wrapper
      ref={setElementRef()}
      onMouseEnter={() => type === "hoverable" && setVisible(true)}
      onMouseLeave={() => type === "hoverable" && setVisible(false)}
      onClick={() => type === "clickable" && setVisible(!visible)}
    >
      {header}
      {visible && (
        <S.Content>
          <ul>
            {content.map((element, id) => (
              <li
                key={id}
                onClick={() => {
                  element.onClick();
                }}
              >
                {element.content}
              </li>
            ))}
          </ul>
        </S.Content>
      )}
    </S.Wrapper>
  );
};
