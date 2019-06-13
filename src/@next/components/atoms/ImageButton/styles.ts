import { styled } from "@styles";

export const ImageButton = styled.div`
  svg:hover {
    circle {
      fill: ${props => props.theme.imageButton.hoverBackgroundColor};
    }
    path {
      fill: ${props => props.theme.imageButton.hoverForegroundColor};
    }
  }
`;
