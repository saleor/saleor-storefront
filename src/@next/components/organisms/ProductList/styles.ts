import { styled } from "@styles";

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  @media (min-width: 540px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const ListItem = styled.div``;

export const Loader = styled.div`
  text-align: center;
  margin: 2.5rem 0;
`;
