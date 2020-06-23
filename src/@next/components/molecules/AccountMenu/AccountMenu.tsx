import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { commonMessages } from "@temp/intl";
import * as S from "./styles";
import { IProps } from "./types";

export const AccountMenu: React.FC<IProps> = ({ links, active }: IProps) => {
  return (
    <S.Wrapper>
      <S.MenuHeader>
        <FormattedMessage {...commonMessages.myAccount} />
      </S.MenuHeader>
      {links.map(link => {
        const menuItem = link
          .replace(/\//g, "")
          .replace("-", " ")
          .split(" ")
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
        return (
          <Link
            to={link}
            key={link}
            data-test="accountMenuLink"
            data-test-id={link}
          >
            <S.MenuItem active={active === link}>{menuItem}</S.MenuItem>
          </Link>
        );
      })}
    </S.Wrapper>
  );
};
