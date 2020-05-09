import React from "react";
import { Link } from "react-router-dom";

import * as S from "./styles";
import { IProps } from "./types";

const L = [
  {
    label: "Account Details",
    link: "/account-details",
    icon: "profile",
  },
  {
    label: "Password",
    link: "/password",
    icon: "password",
  },
  {
    label: "Shipping & Billing Details",
    link: "/shipping-and-billing",
    icon: "icon",
  },
];

export const AccountMenu: React.FC<IProps> = ({ links, active }: IProps) => {
  return (
    <S.Wrapper>
      <S.MenuHeader>Account Information</S.MenuHeader>
      {L.map(item => {
        return (
          <Link
            to={item.link}
            key={item.label}
            data-testid="account_menu__link"
          >
            <span>{item.icon}</span>
            <S.MenuItem active={active === item.link}>{}</S.MenuItem>
          </Link>
        );
      })}
    </S.Wrapper>
  );
};
