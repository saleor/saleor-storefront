import { styled } from "@styles";

export const Link = styled.a<{ fullWidth: boolean; activeClassName?: string }>`
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
