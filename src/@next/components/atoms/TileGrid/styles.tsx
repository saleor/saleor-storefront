import { media, styled } from "@styles";

type TileProps = {
  columns: number;
};

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  margin-top: ${props => `-${props.theme.spacing.gutter}`};
  margin-left: ${props => `-${props.theme.spacing.gutter}`};
`;

export const Tile = styled.div<TileProps>`
  margin: 0;
  padding: 0;
  padding-top: ${props => props.theme.spacing.gutter};
  padding-left: ${props => props.theme.spacing.gutter};
  width: calc(100% / ${props => props.columns});

  ${media.smallScreen`
    width: 100%;
  `}
`;
