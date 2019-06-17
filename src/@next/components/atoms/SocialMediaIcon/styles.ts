import { styled } from "@styles";
import { spacer } from "@styles/constants";

import { IconSVG } from "../IconSVG";

export const Icon = styled(IconSVG)`
  padding: ${props => `${props.theme.spacing.spacer} ${spacer / 2}rem`};

  svg * {
    transition: 0.3s;
  }

  &:hover {
    svg * {
      fill: ${props => props.theme.colors.primaryColor};
    }
  }
`;
