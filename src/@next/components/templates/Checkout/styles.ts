import { styled } from "@styles";

export const Wrapper = styled.div`
  display: grid;

  grid-template-columns: repeat(6fr, 4fr);
  grid-column-gap: 30px;
  grid-template-columns:
    "navigation cartSummary"
    "checkout cartSummary"
    "button cartSummary";
`;

export const Navigation = styled.div`
  grid-area: navigation;
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
