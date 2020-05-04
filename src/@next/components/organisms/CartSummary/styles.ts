import { DefaultTheme, media, styled } from "@styles";

export const Wrapper = styled.div<{ mobileCartOpened: boolean }>`
  background-color: ${props => props.theme.colors.light};
  ${media.mediumScreen`
    width: 100%;
    height: 100%;
    position: fixed;
    top: calc(100% - 86px);
    left: 0%;
    transition: all 0.5s ease;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  `}
  ${props =>
    props.mobileCartOpened &&
    media.mediumScreen`
    top: 0%;
    overflow-y: scroll;
  `}
`;
export const Content = styled.div`
  padding: 0 20px 30px 20px;
`;

export const ProductLine = styled.div`
  padding: 30px 0;
`;

export const CartSummaryProductList = styled.div`
  margin-bottom: 30px;
`;

export const HR = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${props => props.theme.colors.baseFontColorTransparent};
  margin: 0;
  padding: 0;
`;

export const Title = styled.div`
  padding: 30px 20px;
  display: flex;
  justify-content: space-between;
  margin: 0;
  font-size: ${props => props.theme.typography.h3FontSize};
  text-transform: uppercase;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  ${media.mediumScreen`
    font-size: ${(props: { theme: DefaultTheme }) =>
      props.theme.typography.h4FontSize};
    cursor: pointer;
  `}
`;
export const ArrowUp = styled.div<{ mobileCartOpened: boolean }>`
  display: none;
  ${media.mediumScreen`
    display: unset;
  `}
  ${props =>
    props.mobileCartOpened &&
    media.mediumScreen`
    transform: rotate(180deg);
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
