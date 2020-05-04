import { media, styled } from "@styles";

export const Wrapper = styled.div<{
  showShipping: boolean;
  showDiscount: boolean;
}>`
  display: grid;
  font-size: ${props => props.theme.typography.h4FontSize};
  grid-template-areas:
    ". subtotalText subtotalPrice ."
    ${props => props.showShipping && `". shippingText shippingPrice ."`}
    ${props => props.showDiscount && `". discountText discountPrice ."`}
    ". totalText totalPrice .";
  grid-template-columns: 4fr 1.1fr 0.9fr 0.5fr;
  grid-gap: 2rem;
  padding: 2rem 0;
  ${props => media.mediumScreen`
    grid-template-areas:
      ". subtotalText subtotalPrice"
      ${props.showShipping && `". shippingText shippingPrice"`}
      ${props.showDiscount && `". discountText discountPrice"`}
      ". totalText totalPrice";
    grid-template-columns: 0.5fr 3.5fr 2fr;
  `}
  border-bottom: 1px solid rgba(50, 50, 50, 0.1);
`;

export const SubtotalText = styled.div`
  grid-area: subtotalText;
`;
export const SubtotalPrice = styled.div`
  grid-area: subtotalPrice;
  ${media.mediumScreen`
    text-align: right;
  `}
`;

export const ShippingText = styled.div`
  grid-area: shippingText;
`;
export const ShippingPrice = styled.div`
  grid-area: shippingPrice;
  ${media.mediumScreen`
    text-align: right;
  `}
`;

export const DiscountText = styled.div`
  grid-area: discountText;
`;
export const DiscountPrice = styled.div`
  grid-area: discountPrice;
  ${media.mediumScreen`
    text-align: right;
  `}
`;

export const TotalText = styled.div`
  grid-area: totalText;
  font-weight: bold;
`;
export const TotalPrice = styled.div`
  grid-area: totalPrice;
  font-weight: bold;
  ${media.mediumScreen`
    text-align: right;
  `}
`;
