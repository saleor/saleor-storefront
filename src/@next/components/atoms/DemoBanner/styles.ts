import ReactSVG from "react-svg";

import { styled } from "@styles";

export const Wrapper = styled.section`
  width: 100%;
  background-color: ${props => props.theme.colors.bannerBackground};
  padding: 0 1.3rem;
  font-size: 12;
`;

export const BorderedWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-height: ${props => props.theme.demoBanner.height};
  padding: 1.5em 0;

  background-image: ${props => `linear-gradient(
    to right,
    ${props.theme.colors.bannerEdge} 13%,
    rgba(255, 255, 255, 0) 0%
  );`};
  background-position: bottom;
  background-size: 12px 1px;
  background-repeat: repeat-x;
`;

export const LogoWrapper = styled(ReactSVG)`
  line-height: 0;
`;

export const LinkList = styled.div`
  display: flex;
  align-items: center;
`;

export const Link = styled.a`
  padding: 1rem;
`;

export const TextEmphasis = styled.span`
  color: ${props => props.theme.colors.bannerLink};
  text-transform: uppercase;
  font-weight: 600;
`;

export const Divider = styled.div`
  border-right: 1px solid ${props => props.theme.colors.bannerEdge};
  height: 2rem;
`;
