import { media, styled } from "@styles";

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  margin-top: ${props => `-${props.theme.flexboxgrid.gutterWidth}rem`};
  margin-left: ${props => `-${props.theme.flexboxgrid.gutterWidth}rem`};
`;

export const Tile = styled.div`
  margin: 0;
  padding: 0;
  padding-top: ${props => `${props.theme.flexboxgrid.gutterWidth}rem`};
  padding-left: ${props => `${props.theme.flexboxgrid.gutterWidth}rem`};
  width: 33.3333%;

  ${media.smallScreen`
    width: 100%;
  `}
`;
