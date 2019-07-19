import { mediumScreen, smallScreen } from "@styles/constants";
import React from "react";
import Media from "react-responsive";

import { Icon, NavLink } from "@components/atoms";

import Logo from "images/logo.svg";
import * as S from "./styles";
import { IProps } from "./types";

const items = [
  {
    id: 123,
    name: "Element I",
    page: "/",
  },
  {
    id: 312,
    name: "Element II",
    page: "/wew",
  },
];

export const TopNavbar: React.FC<IProps> = ({  }: IProps) => {
  return (
    <S.Wrapper>
      <S.Navigation>
        <Media maxWidth={mediumScreen}>
          <S.Mobile>
            <li>
              <Icon name="hamburger" />
            </li>
          </S.Mobile>
        </Media>
        <Media minWidth={mediumScreen}>
          <S.Desktop style={{ display: "flex" }}>
            {items.map(item => (
              <li key={item.id}>
                <NavLink item={item} />
              </li>
            ))}
          </S.Desktop>
        </Media>
      </S.Navigation>
      <S.Center>
        <S.LogoWrapper path={Logo} />
      </S.Center>
      <S.Actions>
        <Media minWidth={mediumScreen}>
          <S.IconWrapper>
            <Icon name="profile" size={24} />
          </S.IconWrapper>
          <S.IconWrapper>
            <Icon name="heart" size={24} />
          </S.IconWrapper>
        </Media>
        <S.IconWrapper>
          <Icon name="cart" size={24} />
        </S.IconWrapper>
        <S.SearchButton>
          <Media minWidth={smallScreen}>
            <S.Text>SEARCH</S.Text>
          </Media>
          <Icon name="search" size={24} />
        </S.SearchButton>
      </S.Actions>
    </S.Wrapper>
  );
};
