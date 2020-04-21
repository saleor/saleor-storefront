import { media, styled } from "@styles";

export const Wrapper = styled.div`
  margin: 45px 0;
  display: grid;

  grid-template-columns: 8fr 4fr;
  grid-template-rows: 85px auto auto;
  grid-column-gap: 30px;
  grid-template-areas:
    "navigation cartSummary"
    "checkout cartSummary"
    "button cartSummary";

  ${media.mediumScreen`
    grid-template-columns: 1fr;
    grid-template-areas:
      "navigation"
      "checkout"
      "button";
  `}
`;

export const Navigation = styled.div`
  grid-area: navigation;
  border-bottom: 1px solid
    ${props => props.theme.colors.baseFontColorTransparent};
  padding-bottom: 43px;
  height: 85px;
`;
export const Checkout = styled.div`
  grid-area: checkout;
  padding: 3rem 0;
`;
export const CartSummary = styled.div`
  grid-area: cartSummary;

  ${media.mediumScreen`
    position: fixed;
    bottom: 0;
  `}
`;
export const Button = styled.div`
  grid-area: button;
`;
