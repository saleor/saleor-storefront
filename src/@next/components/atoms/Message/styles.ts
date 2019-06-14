import { DefaultTheme, styled } from "@styles";
import ReactSVG from "react-svg";

import { IProps } from "./types";

const borderColors = (theme: DefaultTheme["message"]) => ({
  error: theme.errorColor,
  neutral: theme.neutralColor,
  success: theme.successColor,
});

export const Wrapper = styled.div<{ status: IProps["status"] }>`
  display: ${props => (props.hidden ? "none" : "block")};
  width: ${props => props.theme.message.width};
  padding: ${props => props.theme.message.padding};
  background-color: ${props => props.theme.message.backgroundColor};
  box-shadow: 0px 6px 15px 3px rgba(0, 0, 0, 0.25);
  position: fixed;
  bottom: ${props => props.theme.spacing.spacer};
  right: ${props => props.theme.spacing.spacer};
  border-left: 0.3rem solid;
  border-color: ${props => borderColors(props.theme.message)[props.status!]};
`;

export const Title = styled.p`
  text-transform: ${props => props.theme.message.titleTransform};
  font-weight: ${props => props.theme.message.titleWeight};
  margin: ${props => props.theme.message.titleMargin};
`;

export const CloseIcon = styled(ReactSVG)`
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1.5rem;
  transition: 0.3s;
  line-height: 0;

  svg * {
    transition: 0.3s;
  }

  &:hover {
    svg * {
      fill: $gray;
    }
  }
`;

export const Content = styled.div`
  margin: ${props => props.theme.message.contentMargin};
`;
