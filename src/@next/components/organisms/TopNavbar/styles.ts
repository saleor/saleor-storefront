import { media, styled } from "@styles";
import ReactSVG from "react-svg";

export const NAVBAR_HEIGHT = "3.55rem";

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.light};
  display: flex;
  justify-content: space-between;
  height: ${NAVBAR_HEIGHT};
  position: relative;
`;

export const Tile = styled.div`
  display: flex;
  align-items: center;
  flex-basis: calc(50% - 3rem);
  overflow: hidden;

  ${media.largeScreen`
    flex-basis: calc(50% - 2rem);
  `}
`;

export const Navigation = styled(Tile)``;

export const Center = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Actions = styled(Tile)`
  justify-content: flex-end;
`;

export const LogoWrapper = styled(ReactSVG)`
  line-height: 0;

  svg {
    width: 6rem;

    ${media.largeScreen`
      width: 4rem;
    `}

    ${media.largeScreen`
      height: 30px;
    `}
  }
`;

export const IconWrapper = styled.button`
  margin: 0 ${props => props.theme.spacing.spacer};

  path {
    transition: 0.3s;
  }

  &:hover {
    path {
      fill: ${props => props.theme.colors.primary};
    }
  }
`;

export const SearchButton = styled.button`
  border-left: 1px solid ${props => props.theme.colors.light};
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 ${props => props.theme.spacing.spacer};
  transition: all 0.3s;

  path {
    transition: 0.3s;
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    path {
      fill: ${props => props.theme.colors.primary};
    }
  }
`;

export const Text = styled.span`
  font-size: ${props => props.theme.typography.baseFontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  margin-right: 2rem;
`;

export const Mobile = styled.ul`
  padding-left: 1rem;

  li {
    line-height: 0;
  }
`;

export const Desktop = styled.ul`
  display: flex;
  padding: 0;
  white-space: nowrap;

  li {
    margin-left: 2rem;
  }
`;

export const Button = styled.button`
  font-size: ${({ theme }) => theme.typography.baseFontSize};
  font-weight: ${({ theme }) => theme.typography.boldFontWeight};
  text-transform: uppercase;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const NestedLink = styled.button``;
