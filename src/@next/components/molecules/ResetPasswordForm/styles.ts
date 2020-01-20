import { styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  h3 {
    font-weight: ${props => props.theme.typography.boldFontWeight};
    text-transform: uppercase;
  }

  p {
    color: ${props => props.theme.colors.lightFont};
  }
`;

export const GeneralError = styled.p`
  color: ${props => props.theme.colors.error} !important;
`;

export const InputFields = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 10.5rem;
  margin: 1rem auto;
`;
