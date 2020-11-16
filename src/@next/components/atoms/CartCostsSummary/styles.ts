import { styled } from "@styles";

export const Wrapper = styled.div<{
  showShipping: boolean;
  showDiscount: boolean;
}>`
  width: 100%;
  display: grid;
  font-size: ${props => props.theme.typography.h4FontSize};
  grid-template-areas:
    "subtotalText subtotalPrice"
    ${props => props.showShipping && `"shippingText shippingPrice"`}
    ${props => props.showDiscount && `"discountText discountPrice"`}
    "totalText totalPrice";
  grid-template-columns: 1.1fr 0.9fr;
  grid-gap: 1.4rem;
  padding: 0 0 1.4rem 0;
  border-bottom: 1px solid rgba(50, 50, 50, 0.1);
`;

export const SubtotalText = styled.div`
  grid-area: subtotalText;
`;
export const SubtotalPrice = styled.div`
  grid-area: subtotalPrice;
  text-align: right;
`;

export const ShippingText = styled.div`
  grid-area: shippingText;
`;
export const ShippingPrice = styled.div`
  grid-area: shippingPrice;
  text-align: right;
`;

export const DiscountText = styled.div`
  grid-area: discountText;
`;
export const DiscountPrice = styled.div`
  grid-area: discountPrice;
  text-align: right;
`;

export const TotalText = styled.div`
  grid-area: totalText;
  font-weight: bold;
`;
export const TotalPrice = styled.div`
  grid-area: totalPrice;
  font-weight: bold;
  text-align: right;
`;
