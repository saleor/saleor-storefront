import { styled } from "@styles";

export const Wrapper = styled.div`
  display: grid;
  grid-gap: 20px;
`;

export const Tile = styled.label<{ checked: boolean }>`
  display: block;
  background-color: ${props => props.theme.colors.light};
  padding: 20px;
  ${props => props.checked && `border: 2px solid #21125E;`}
  cursor: pointer;
`;
