import { DefaultTheme, styled } from "@styles";

type WrapperProps = {
  active?: boolean;
  error?: boolean;
  disabled?: boolean;
  theme: DefaultTheme;
};

export const Form = styled.form`
  padding: 2rem 0;
`;

export const Card = styled.div<WrapperProps>`
  display: grid;
  grid-template-areas:
    "cardNumber cardNumber cardNumber cardNumber cardNumber "
    "cardExpiry cardExpiry cardExpiry cardCvc cardCvc";
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: ${props => props.theme.spacing.fieldSpacer};

  .StripeElement {
    padding: 0.8rem 1rem;
    margin: 0;
    width: 100%;
    font-size: ${props => props.theme.typography.baseFontSize};
    outline: none;
    background-color: transparent;
    ::placeholder {
      font-size: 0;
      visibility: hidden;
    }
    &--empty {
      font-size: 0;
    }
  }
`;

export const CardNumberField = styled.div`
  grid-area: cardNumber;
`;

export const CardExpiryField = styled.div`
  grid-area: cardExpiry;
`;

export const CardCvcField = styled.div`
  grid-area: cardCvc;
`;
