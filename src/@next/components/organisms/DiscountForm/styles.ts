import { styled } from "@styles";

export const DiscountForm = styled.form``;

export const Input = styled.div`
  margin-bottom: ${props => props.theme.spacing.spacer};
`;

export const InputWithButton = styled.div`
  display: flex;
`;

export const InputWrapper = styled.div`
  flex: 1;
`;

export const ButtonWrapper = styled.div`
  width: auto;
  min-width: 110px;

  button {
    padding: 0.8rem 1rem;
  }
`;

export const ChipsWrapper = styled.div`
  margin: 0.4rem 0 0 0;
`;
