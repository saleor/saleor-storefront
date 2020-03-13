import { DefaultTheme, media, styled } from "@styles";

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.light};
  padding: 30px 20px;
`;

export const ProductLine = styled.div`
  padding: 30px 0;
`;

export const HR = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${props => props.theme.colors.baseFontColorTransparent};
  margin: 0;
  padding: 0;
`;

export const Title = styled.p`
  margin: 0;
  font-size: ${props => props.theme.typography.h3FontSize};
  text-transform: uppercase;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  ${media.smallScreen`
    font-size: ${(props: { theme: DefaultTheme }) =>
      props.theme.typography.h4FontSize};
  `}
`;
export const CostLine = styled.div<{ last: boolean }>`
  display: flex;
  justify-content: space-between;
  span {
    display: inline-block;
  }
  font-weight: ${props =>
    props.last ? props.theme.typography.boldFontWeight : "normal"};
`;

export const Costs = styled.div`
  display: flex;
  flex-direction: column;

  div {
    margin-bottom: 20px;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
`;
