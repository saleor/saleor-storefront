import { styled } from "@styles";

export const ImageButton = styled.span`
  div {
    display: inline-block;
  }
  padding-right: 0.5rem;
  svg:hover {
    circle {
      fill: ${props => props.theme.imageButton.hoverBackgroundColor};
    }
    path {
      fill: ${props => props.theme.imageButton.hoverForegroundColor};
    }
  }
`;
