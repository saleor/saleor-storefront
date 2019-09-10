import { styled } from "@styles";

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.light};
  height: 100%;
  /* height: auto; */
  padding-left: 3rem;
  padding-top: 2.5rem;
`;

export const MenuHeader = styled.div`
  font-size: ${props => props.theme.typography.h3FontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  text-transform: "uppercase";
  padding-bottom: 2rem;
`;

export const MenuItem = styled.div<{
  active: boolean;
}>`
  cursor: pointer;
  padding-bottom: 1.5rem;
  color: ${props => (props.active ? props.theme.colors.activeMenuOption : "")};
`;
