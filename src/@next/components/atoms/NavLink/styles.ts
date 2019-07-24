import { styled } from "@styles";
import { NavLink } from "react-router-dom";
import { css } from "styled-components";

import { LinkType } from "./types";

const strikethrough = css`
  &:before {
    background-color: ${props => props.theme.colors.primary};
    content: "";
    height: 7px;
    left: -5px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) skew(45deg);
    width: calc(100% + 10px);
    z-index: -1;
  }
`;

export const Link = styled(NavLink)<{ fullWidth: boolean; type: LinkType }>`
  position: relative;
  font-weight: ${({ theme }) => theme.typography.boldFontWeight};
  text-transform: uppercase;
  transition: 300ms;
  z-index: 0;

  ${({ fullWidth }) =>
    fullWidth &&
    `
    display: block;
    width: 100%;
  `}

  &:hover, &:focus {
    outline: none;
    ${({ type, theme }) =>
      type === "main" ? strikethrough : `color: ${theme.colors.primary}`};
  }       

  /* Active URL styles
  &.${props => props.activeClassName} {
    ${strikethrough}
  } 
  */
`;
