import { media, styled } from "@styles";

export const Wrapper = styled.div`
  display: grid;
  min-height: 140px;
  max-height: min-content;
  width: 100%;
  grid-template-areas: "photo description unitPrice quantity totalPrice trash";
  grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 0.5fr;
  align-items: center;
  border-bottom: 1px solid rgba(50, 50, 50, 0.1);
  padding: 0.8rem 0.5rem;
  ${media.mediumScreen`
    grid-template-columns: 1fr 2fr 2fr;
    grid-row-gap: 15px;
    grid-column-gap: 20px;
    grid-template-areas: "photo description description"
    "trash description description"
    "trash unitPrice quantity"
    ". . totalPrice";
    padding: 1rem 0rem;
  `};
`;

export const QuantityButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0 15px 0 0;
  width: 50px;

  > div {
    display: flex;
  }

  svg {
    cursor: pointer;
    justify-self: center;
  }
`;

export const Photo = styled.div`
  grid-area: photo;
  display: flex;
  align-items: flex-start;
  align-self: top;
  width: 70px;
  height: 90px;

  background-color: #f1f5f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const Description = styled.div`
  grid-area: description;
  height: 100%;
  margin-top: 20px;
  margin-left: 20px;
  ${media.mediumScreen`
    margin-left: 0px;
  `}
`;

export const Sku = styled.p`
  margin: 6px 0;
  text-align: left;
  margin-bottom: 10px;
`;

export const Attributes = styled.div`
  display: grid;
  grid-auto-columns: max-content;
  grid-template-columns: repeat(auto-fit, minmax(166px, 500px));
  margin-left: -15px;
  ${media.mediumScreen`
    flex-flow: column;
  `};
`;

export const SingleAttribute = styled.p`
  margin: 0;
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  white-space: nowrap;
  background-color: white;
  padding: 0px 15px;
`;

export const Name = styled.p`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: ${props => props.theme.typography.h4FontSize};
  text-align: left;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

export const LightFont = styled.span`
  font-size: ${props => props.theme.typography.smallFontSize};
  color: rgba(125, 125, 125, 0.6);
`;

export const Price = styled.div`
  font-size: ${props => props.theme.typography.h4FontSize};
  display: flex;
  justify-content: center;
  font-weight: bold;
  ${media.mediumScreen`
    font-weight: normal;
    flex-direction: column;
  `}

  p {
    margin: 0;
  }
`;

export const PriceLabel = styled.p`
  display: none;
  ${media.mediumScreen`
    display: block;
  `}
`;

export const TotalPrice = styled(Price)`
  grid-area: totalPrice;
  ${media.mediumScreen`
    p {
      text-align: right;
    }
  `}
`;

export const Trash = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: trash;
`;

export const UnitPrice = styled(Price)`
  grid-area: unitPrice;
`;

export const Quantity = styled.div`
  grid-area: quantity;
  min-width: 120px;
  margin: 0 15px;
`;
