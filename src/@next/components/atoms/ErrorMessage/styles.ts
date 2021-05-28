import { styled } from "@styles";

export const ErrorMessage = styled.div`
  color: #fe6e76;
  font-size: ${props => props.theme.input.labelFontSize};
`;

export const ErrorParagraph = styled.p`
  margin: 0;
`;

ErrorMessage.displayName = "S.ErrorMessage";
