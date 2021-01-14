import { css } from "styled-components";

import { media, styled } from "@styles";

const textProps = css`
  font-size: ${props => props.theme.typography.baseFontSize};
  margin: 0 0 0.5rem 0;
  text-align: left;
`;

export const Wrapper = styled.div`
  background: ${props => props.theme.colors.light};
  padding: 2.5rem;
  text-align: center;
  height: 26rem;
  display: flex;
  flex-direction: column;
  transition: 0.3s;

  :hover {
    background-color: ${props => props.theme.colors.hoverLightBackground};
  }

  ${media.largeScreen`
    padding: 1.8rem;
  `}
`;

export const Title = styled.h4`
  text-transform: uppercase;
  font-weight: normal;
  ${textProps}
`;

export const Price = styled.p`
  ${textProps}
`;

export const Image = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;

  > img {
    flex-grow: 1;
    object-fit: contain;
  }
`;
