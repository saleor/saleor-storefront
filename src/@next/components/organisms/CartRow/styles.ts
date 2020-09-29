import { css } from "styled-components";

import { media, styled } from "@styles";

import { ICartRowType } from "./types";

const condenseWrapper = css`
  grid-template-columns: 1fr 2fr 2fr;
  grid-row-gap: 15px;
  grid-column-gap: 20px;
  grid-template-areas:
    "photo description description"
    "trash description description"
    "trash unitPrice quantity"
    ". . totalPrice";
  padding: 1.6rem 0rem;
`;
const responsiveWrapper = css`
  grid-template-areas: "photo description unitPrice quantity totalPrice trash";
  grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 0.5fr;
  padding: 0.8rem 0.5rem;
  ${media.mediumScreen`
    ${condenseWrapper}
  `};
`;
export const Wrapper = styled.div<{ cartRowType: ICartRowType }>`
  display: grid;
  min-height: 140px;
  max-height: min-content;
  width: 100%;
  ${props =>
    props.cartRowType === "condense" ? condenseWrapper : responsiveWrapper}
  align-items: center;
  border-bottom: 1px solid rgba(50, 50, 50, 0.1);
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

const condensePhoto = css`
  margin: 0 auto;
`;
const responsivePhoto = css`
  margin: 0;
  ${media.mediumScreen`
    ${condensePhoto}
`}
`;
export const Photo = styled.div<{ cartRowType: ICartRowType }>`
  grid-area: photo;
  display: flex;
  align-items: center;
  align-self: top;
  width: 70px;
  height: 90px;

  background-color: #f1f5f5;

  ${props =>
    props.cartRowType === "condense" ? condensePhoto : responsivePhoto}

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const condenseDescription = css`
  margin: 6px 0 6px 0;
`;
const responsiveDescription = css`
  margin: 20px 0 0 20px;
  ${media.mediumScreen`
    ${condenseDescription}
`}
`;
export const Description = styled.div<{ cartRowType: ICartRowType }>`
  grid-area: description;
  height: 100%;
  ${props =>
    props.cartRowType === "condense"
      ? condenseDescription
      : responsiveDescription}
`;

export const Sku = styled.p`
  margin: 6px 0 22px 0;
  text-align: left;
`;

const condenseAttributes = css`
  flex-flow: column;
`;
const responsiveAttributes = css`
  ${media.mediumScreen`
    ${condenseAttributes}
  `};
`;
export const Attributes = styled.div<{ cartRowType: ICartRowType }>`
  display: grid;
  grid-auto-columns: max-content;
  grid-template-columns: repeat(auto-fit, minmax(166px, 500px));
  margin-left: -15px;
  ${props =>
    props.cartRowType === "condense"
      ? condenseAttributes
      : responsiveAttributes}
`;

export const SingleAttribute = styled.p`
  margin: 0;
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  white-space: nowrap;
  background-color: white;
  padding: 0px 15px;
  font-size: ${props => props.theme.typography.smallFontSize};
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

const condensePrice = css`
  font-weight: normal;
  flex-direction: column;
`;
const responsivePrice = css`
  font-weight: bold;
  ${media.mediumScreen`
    ${condensePrice}
  `};
`;
export const Price = styled.div<{ cartRowType: ICartRowType }>`
  font-size: ${props => props.theme.typography.h4FontSize};
  display: flex;
  justify-content: center;
  ${props =>
    props.cartRowType === "condense" ? condensePrice : responsivePrice}

  p {
    margin: 0;
  }
`;

const condensePriceLabel = css`
  display: block;
`;
const responsivePriceLabel = css`
  display: none;
  ${media.mediumScreen`
    ${condensePriceLabel}
  `};
`;
export const PriceLabel = styled.p<{ cartRowType: ICartRowType }>`
  ${props =>
    props.cartRowType === "condense"
      ? condensePriceLabel
      : responsivePriceLabel}
`;

const condenseTotalPrice = css`
  p {
    text-align: right;
  }
`;
const responsiveTotalPrice = css`
  ${media.mediumScreen`
    ${condenseTotalPrice}
  `};
`;
export const TotalPrice = styled(Price)<{ cartRowType: ICartRowType }>`
  grid-area: totalPrice;
  ${props =>
    props.cartRowType === "condense"
      ? condenseTotalPrice
      : responsiveTotalPrice}
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

const condenseQuantity = css`
  margin: 0;
`;
const responsiveQuantity = css`
  margin: 0 15px;
  ${media.mediumScreen`
    ${condenseQuantity}
  `};
`;
export const Quantity = styled.div<{ cartRowType: ICartRowType }>`
  grid-area: quantity;
  min-width: 120px;
  ${props =>
    props.cartRowType === "condense" ? condenseQuantity : responsiveQuantity}
`;

export const ErrorMessages = styled.div`
  position: absolute;
  top: 100%;
`;
