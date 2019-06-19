import { styled } from "@styles";

export const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.input.labelFontSize};
`;

ErrorMessage.displayName = "S.ErrorMessage";
