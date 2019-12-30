import { styled } from "@styles";

export const Wrapper = styled.div``;

export const ProductName = styled.h3`
  text-transform: uppercase;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  margin-bottom: ${props => props.theme.spacing.spacer};
`;

export const ProductPrice = styled.h4`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  margin-bottom: ${props => props.theme.spacing.spacer};
`;

export const ProductAttribute = styled.div`
  font-size: ${props => props.theme.typography.smallFontSize};
  margin-top: 20px;

  > span:first-child {
    color: ${props => props.theme.colors.lightFont};
  }
`;

export const ProductVariantAttributeList = styled.div`
  display: grid;
  margin-top: 20px;

  .react-select-wrapper,
  .input {
    width: 50%;
    margin-bottom: 1rem;
  }
`;

export const ProductQuantity = styled.div`
  margin-top: 20px;
  border-top: 1px solid ${props => props.theme.colors.dividerDark};
  padding-top: 20px;
`;

export const ProductDescription = styled.div`
  margin: ${props => props.theme.spacing.spacer} * 2 0;

  h4 {
    font-weight: ${props => props.theme.typography.boldFontWeight};
    color: ${props => props.theme.colors.lightFont};
    border-bottom: 1px solid ${props => props.theme.colors.dividerDark};
    padding-bottom: ${props => props.theme.spacing.spacer} / 2;
    margin-bottom: ${props => props.theme.spacing.spacer} / 2;
  }

  p {
    font-size: ${props => props.theme.typography.smallFontSize};
  }

  img {
    max-width: 100%;
  }
`;
