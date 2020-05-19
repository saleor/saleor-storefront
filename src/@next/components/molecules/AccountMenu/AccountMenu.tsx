import React from "react";
import { Link } from "react-router-dom";

import * as S from "./styles";
import { IProps } from "./types";

import { FormattedMessage } from "react-intl";

export const AccountMenu: React.FC<IProps> = ({ links, active }: IProps) => {
  return (
    <S.Wrapper>
      <S.MenuHeader>
        <FormattedMessage
            defaultMessage="MY ACCOUNT"
        />
      </S.MenuHeader>
      {links.map(link => {
        const menuItem = link
          .replace(/\//g, "")
          .replace("-", " ")
          .split(" ")
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
        return (
          <Link to={link} key={link} data-testid="account_menu__link">
            <S.MenuItem active={active === link}>{menuItem}</S.MenuItem>
          </Link>
        );
      })}
    </S.Wrapper>
  );
};
