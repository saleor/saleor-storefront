import { styled } from "@styles";
import { Link as _Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { css } from "styled-components";

import { NavLink as _NavLink } from "@components/atoms";

import { NAVBAR_HEIGHT } from "../TopNavbar/styles";

const MenuItemStyles = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  outline: none;
  padding: 0 25px 0px 15px;
  text-transform: uppercase;
  transition: 300ms;
  height: ${NAVBAR_HEIGHT};
  width: 100%;
  ${({ theme }) => `
    border-bottom: 1px solid ${theme.colors.divider};
    font-weight: ${theme.typography.boldFontWeight};
    font-size: ${theme.typography.baseFontSize};
  `}

  path {
    transition: 300ms;
  }

  &:hover,
  &:focus {
    ${({ theme }) => `
      color: ${theme.colors.primary};
      background-color: ${theme.colors.hoverLightBackground};
    `}

    path {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Wrapper = styled.div`
  position: relative;
  max-width: calc(100vw - 5rem);
  width: 30rem;
  overflow: hidden;
`;

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${NAVBAR_HEIGHT};
  padding: 0 15px;
  border-bottom: 1px solid ${props => props.theme.colors.divider};
`;

export const Menu = styled.ul`
  background-color: ${props => props.theme.colors.white};
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
`;

export const Item = styled.li``;

export const NavButton = styled.button`
  ${MenuItemStyles};
`;

export const NavLink = styled(_NavLink).attrs({
  fullWidth: true,
})`
  ${MenuItemStyles};
`;

export const Link = styled(_Link)`
  ${MenuItemStyles};
`;

export const LogoWrapper = styled(ReactSVG)`
  line-height: 0;

  svg {
    width: 30px;
    height: 30px;
  }
`;

export const IconWrapper = styled.span`
  line-height: 1;
  margin-right: ${({ theme }) => theme.spacing.spacer};
`;

export const SubcategoryIcon = styled.div`
  margin-left: auto;
`;

export const BackButton = styled(NavButton)`
  color: #7d7d7d;
  padding: 0;

  &:hover {
    background-color: transparent;
  }
`;

export const CloseIconWrapper = styled.button`
  padding: 5px;

  path {
    transition: 300ms;
  }

  &:hover,
  &:focus {
    path {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;
