import React from "react";

import { Icon } from "@components/atoms";
import { useHandlerWhenClickedOutside } from "@hooks";

import { Link } from "react-router-dom";
import * as S from "./styles";
import { IProps } from "./types";

export const AccountMenuMobile: React.FC<IProps> = ({
  links,
  active,
}: IProps) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setShowMenu(false);
  });

  return (
    <S.Wrapper
      onClick={() => {
        setShowMenu(true);
      }}
      ref={setElementRef()}
    >
      {active
        .replace(/\//g, "")
        .replace("-", " ")
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ")}
      <Icon name="select_arrow" size={8} />
      {showMenu && (
        <S.Overlay>
          <S.MenuHeader>Go to</S.MenuHeader>
          {links.map(link => {
            const menuItem = link
              .replace(/\//g, "")
              .replace("-", " ")
              .split(" ")
              .map(s => s.charAt(0).toUpperCase() + s.substring(1))
              .join(" ");
            return (
              <div
                onClick={evt => {
                  evt.stopPropagation();
                  setShowMenu(false);
                }}
                key={link}
              >
                <Link to={link}>
                  <S.MenuItem active={active === link}>
                    {menuItem}
                    <Icon name="select_arrow" size={8} />
                  </S.MenuItem>
                </Link>
              </div>
            );
          })}
        </S.Overlay>
      )}
    </S.Wrapper>
  );
};
