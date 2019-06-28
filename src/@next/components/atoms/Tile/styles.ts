import { styled } from "@styles";
import { css } from "styled-components";

interface WrapperProps {
  readonly tileType?: "hover" | "addNew";
}

export const Wrapper = styled.div<WrapperProps>`
  background-color: ${props => props.theme.tile.backgroundColor};
  border: 1px transparent solid;

  margin-bottom: ${props => `${props.theme.flexboxgrid.gutterWidth}rem`};
  padding: 0;
  transition: all 0.3s, color 0s, fill 0s;

  ${props => {
    if (props.tileType === "hover") {
      return css`
        :hover {
          cursor: pointer;
          border-color: ${props.theme.tile.hoverBorder};
        }
      `;
    }
    if (props.tileType === "addNew") {
      return css`
        color: ${props.theme.colors.secondary};
        :hover {
          cursor: pointer;
          color: ${props.theme.colors.white};
          background-color: ${props.theme.colors.secondary};
          svg path {
            fill: ${props.theme.colors.white};
          }
        }
      `;
    }
  }}
`;

export const Header = styled.div`
  border-bottom: 2px solid ${props => props.theme.tile.divisionLine};
`;

export const Content = styled.div`
  padding: 1rem 1.25rem;
`;

export const Footer = styled.div`
  padding: 0 1rem;
  margin-bottom: 1rem;
`;
