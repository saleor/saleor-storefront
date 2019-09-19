import { media, styled } from "@styles";

export const Wrapper = styled.div``;

export const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 5rem;
  cursor: pointer;

  border-bottom: 1px solid ${props => props.theme.colors.tableDivider};
`;

export const HeaderRow = styled(Row)`
  color: ${props => props.theme.colors.lightFont};
  cursor: default;
`;

export const IndexNumber = styled.div`
  width: 15%;
  ${media.smallScreen`
     width: 50%;
  `}
`;
export const ProductsOrdered = styled.div`
  width: 25%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;

  img {
    max-width: 50px;
    height: auto;
  }
`;
export const DateOfOrder = styled.div`
  width: 25%;
`;
export const Value = styled.div`
  width: 10%;
`;
export const Status = styled.div`
  width: 25%;
  ${media.smallScreen`
     width: 50%;
  `}
`;
