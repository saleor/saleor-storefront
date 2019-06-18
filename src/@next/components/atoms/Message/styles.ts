import { DefaultTheme, styled } from "@styles";

import { IProps } from "./types";

const borderColors = (theme: DefaultTheme["message"]) => ({
  action: theme.errorColor,
  error: theme.errorColor,
  neutral: theme.neutralColor,
  success: theme.successColor,
});

export const Wrapper = styled.div<{ status: IProps["status"] }>`
  width: ${props => props.theme.message.width};
  padding: ${props => props.theme.message.padding};
  background-color: ${props => props.theme.message.backgroundColor};
  box-shadow: 0px 6px 15px 3px rgba(0, 0, 0, 0.25);
  position: fixed;
  bottom: ${props => props.theme.spacing.spacer};
  right: ${props => props.theme.spacing.spacer};
  border-left: 0.4rem solid;
  border-color: ${props => borderColors(props.theme.message)[props.status!]};
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.p`
  text-transform: ${props => props.theme.message.titleTransform};
  font-weight: ${props => props.theme.message.titleWeight};
  letter-spacing: ${props => props.theme.message.letterSpacing};
  margin: ${props => props.theme.message.titleMargin};
`;

export const IconButton = styled.button`
  cursor: pointer;

  path {
    transition: 0.3s;
  }

  &:hover {
    path {
      fill: ${props => props.theme.colors.primaryColor};
    }
  }
`;

export const Content = styled.div`
  margin: ${props => props.theme.message.contentMargin};
`;

export const ActionButton = styled.button`
  color: ${props => props.theme.colors.secondaryColor};
  cursor: pointer;
  font-size: ${props => props.theme.typography.baseFontSize};
  text-decoration: underline;
`;
