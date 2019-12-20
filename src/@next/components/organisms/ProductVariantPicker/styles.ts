import { media, styled } from "@styles";

export const Wrapper = styled.div``;

export const RowWithTwoCells = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & > div {
    width: calc(50% - ${props => props.theme.spacing.spacer} / 2);
    ${media.smallScreen`
      width: 100%;
    `}
  }
`;
