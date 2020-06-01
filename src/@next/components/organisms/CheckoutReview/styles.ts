import { media, styled } from "@styles";

export const Wrapper = styled.div``;

export const Grid = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(2, 1fr);

  ${media.smallScreen`
    grid-template-columns: repeat(1, 1fr);
  `}
`;

export const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid
    ${props => props.theme.colors.baseFontColorTransparent};
  margin: 0 0 20px 0;
`;

export const Title = styled.h3`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0 0 1.6rem 0;
`;

export const SubTitle = styled.h4`
  padding: 0.6rem 0 1.4rem 0;
  font-size: ${props => props.theme.typography.baseFontSize};
  color: rgba(50, 50, 50, 0.6);
`;

export const TextSummary = styled.p`
  line-height: 1.6;
  font-size: ${props => props.theme.typography.h4FontSize};
`;

export const ErrorMessages = styled.div`
  margin-top: 30px;
`;
