import { styled } from "@styles";

export const Wrapper = styled.div`
  background-color: ${props => props.theme.tile.backgroundColor};
  padding: 0;
`;

export const Header = styled.div`
  border-bottom: 2px solid ${props => props.theme.tile.divisionLine};
`;
