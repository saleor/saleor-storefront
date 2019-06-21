import { styled } from "@styles";

export const Wrapper = styled.div`
  padding: 0;
  padding-right: 0.5rem;
  margin: 0;
  display: inline-block;
  cursor: pointer;

  svg {
    border-radius: 50%;
    border-width: 0;
    display: block;
    background-color: ${props => props.theme.iconButton.backgroundColor};
    :hover {
      background-color: ${props => props.theme.colors.secondaryColor};
      path {
        fill: ${props => props.theme.iconButton.hoverForegroundColor};
      }
    }
  }
`;
