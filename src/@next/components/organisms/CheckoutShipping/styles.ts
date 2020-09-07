import { styled } from "@styles";

export const ShippingMethodForm = styled.form`
  display: grid;
  grid-gap: 20px;
`;

export const Title = styled.h3`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0 0 1.6rem 0;
`;

export const Tile = styled.label<{ checked: boolean }>`
  display: block;
  background-color: ${props => props.theme.colors.light};
  padding: 20px;
  ${props => props.checked && `border: 2px solid #21125E;`}
  cursor: pointer;
`;

export const TileTitle = styled.span`
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const Price = styled.span`
  color: #21125e;
`;
