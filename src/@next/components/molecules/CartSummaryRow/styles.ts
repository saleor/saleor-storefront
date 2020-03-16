import { styled } from "@styles";

export const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 6px;
  grid-column-gap: 20px;
  grid-template-columns: 60px auto auto;
  grid-template-areas:
    "photo name name"
    "photo sku ."
    "photo . ."
    "photo quantity price";
`;

export const Photo = styled.div`
  grid-area: photo;
  width: min-content;

  img {
    height: auto;
    max-width: 60px;
  }
`;
export const Sku = styled.div`
  grid-area: sku;
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const Name = styled.div`
  grid-area: name;
  font-size: ${props => props.theme.typography.h4FontSize};
`;

export const Price = styled.div`
  grid-area: price;
  text-align: right;
  font-size: ${props => props.theme.typography.smallFontSize};
`;
export const Quantity = styled.div`
  grid-area: quantity;
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: ${props => props.theme.typography.smallFontSize};
`;
