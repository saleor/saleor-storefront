import { media, styled } from "@styles";

export const Wrapper = styled.div``;

export const Section = styled.section``;

export const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid
    ${props => props.theme.colors.baseFontColorTransparent};
  margin: 30px 0;
`;

export const Title = styled.h3`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0 0 1.5rem 0;
`;

export const DiscountField = styled.div`
  background-color: ${props => props.theme.colors.light};
  padding: 30px;

  ${media.smallScreen`
    padding: 30px 20px;
  `}
`;
