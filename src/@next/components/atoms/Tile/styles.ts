import { styled } from "@styles";
import { css } from "styled-components";

interface WrapperProps {
  readonly tileType?: "hover" | "addNew";
}

export const Wrapper = styled.div<WrapperProps>`
  background-color: ${props => props.theme.tile.backgroundColor};
  border: 1px transparent solid;
  overflow: auto;
  height: 100%;
  padding: 0;
  transition: all 0.3s, color 0s, fill 0s;

  display: flex;
  flex-direction: column;
  align-items: left;
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
        align-items: center;
        justify-content: center;
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
  }};
`;

Wrapper.displayName = "Tile";

export const Header = styled.div`
  border-bottom: 2px solid ${props => props.theme.tile.divisionLine};
`;

export const Content = styled.div`
  padding: 1rem 1.25rem;
`;

export const Footer = styled.div`
  margin-top: auto;
  padding: 0 1rem;
  margin-bottom: 1rem;
`;
