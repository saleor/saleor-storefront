import { styled } from "@styles";

export const Wrapper = styled.div`
  margin-top: 45px;
  display: grid;

  grid-template-columns: 8fr 4fr;
  grid-column-gap: 30px;
  grid-template-areas:
    "navigation cartSummary"
    "checkout cartSummary"
    "button cartSummary";
`;

export const Navigation = styled.div`
  grid-area: navigation;
  border-bottom: 1px solid
    ${props => props.theme.colors.baseFontColorTransparent};
  padding-bottom: 43px;
`;
export const Checkout = styled.div`
  grid-area: checkout;
`;
export const CartSummary = styled.div`
  grid-area: cartSummary;
`;
export const Button = styled.div`
  grid-area: button;
`;
