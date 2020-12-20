import { media, styled } from "@styles";

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 25px;
  background-color: #f6f6f6;

  ${media.largeScreen`
    grid-template-columns: 1fr;
  `}

  ${media.smallScreen`
    grid-template-columns: 1fr;
  `}
`;

export const Loader = styled.div`
  text-align: center;
  margin: 2.5rem 0;
`;
