import { styled } from "@styles";

export const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.input.labelFontSize};
  margin-top: 30px;
  display: flex;
  background: ${props => props.theme.colors.error};
`;

export const ErrorParagraph = styled.p`
  margin: 0;
  color: white;
  margin: 2rem 1rem;
  font-size: 2rem;
  line-height: 1.8rem;
`;

export const ErrorLabel = styled.p`
  font-size: 0.8rem;
  padding: 0.3rem;
  margin: 1rem;
  background-color: white;
  color: ${props => props.theme.colors.error};
`;

ErrorMessage.displayName = "S.ErrorMessage";
