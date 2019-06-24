import { styled } from "@styles";

export const PaymentForm = styled.form`
  width: 100%;
`;

export const PaymentInput = styled.div`
  margin-bottom: 1rem;
`;
PaymentInput.displayName = "S.PaymentInput";

export const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  // grid-gap: 0 ${props => props.theme.spacing.spacer};
`;
