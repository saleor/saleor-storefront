import { styled } from "@styles";

export const PaymentInput = styled.div<{ error?: boolean }>`
  position: relative;
  margin-bottom: 1rem;
  ${props =>
    props.error &&
    `
  display: block;
  margin-bottom: ${props.theme.spacing.spacer};
  .input_content {
    position: relative;
  }
  `}
  .input {
    margin-bottom: 0;
  }
`;

PaymentInput.displayName = "S.PaymentInput";

export const Grid = styled.div`
  display: grid;
  grid-gap: 0 ${props => props.theme.spacing.spacer};
  grid-template-columns: 1fr 1fr;
`;
