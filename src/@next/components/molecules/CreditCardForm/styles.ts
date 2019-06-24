import { styled } from "@styles";

export const PaymentForm = styled.form`
  width: 100%;
`;

export const PaymentInput = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

PaymentInput.displayName = "S.PaymentInput";

export const Grid = styled.div`
  display: grid;
  grid-gap: 0 ${props => props.theme.spacing.spacer};
  grid-template-columns: 1fr 1fr;
`;
