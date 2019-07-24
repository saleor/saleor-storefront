import { NavLink } from "@components/atoms";
import { styled } from "@styles";

import { NAVBAR_HEIGHT } from "../TopNavbar/styles";

export const Wrapper = styled.div`
  max-width: calc(100vw - 5rem);
  width: 30rem;
`;

export const Bar = styled.div`
  height: ${NAVBAR_HEIGHT};
`;

export const Menu = styled.ul`
  margin: 0;
  padding: 0;
`;

export const Item = styled.li`
  border-bottom: 1px solid ${props => props.theme.colors.divider};
`;

export const Link = styled(NavLink)`
  padding: 20px 15px;
`;
