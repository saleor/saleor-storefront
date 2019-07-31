import { styled } from "@styles";
import { NavLink } from "react-router-dom";

export const Link = styled(NavLink)<{ fullWidth: boolean }>`
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
    color: ${({ theme }) => theme.colors.primary};
  }       

  /* Active URL styles
  &.${props => props.activeClassName} {
    
  } 
  */
`;
