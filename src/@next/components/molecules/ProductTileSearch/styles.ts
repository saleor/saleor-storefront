import { media, styled } from "@styles";
import { css } from "styled-components";

const textProps = css`
  font-size: ${props => props.theme.typography.baseFontSize};
  margin: 0 0 0.5rem 0;
  text-align: center;
`;

export const Wrapper = styled.div`
  background: $white;
  padding: 2.5rem;
  text-align: center;
  transition: 0.3s;

  :hover {
    background-color: $white;
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

export const ArtisanName = styled.p`
  font-weight: normal;
  font-family: "Cardo", serif;
  font-style: italic;
  ${textProps}
`;

export const Price = styled.p`
  ${textProps}
`;

export const Image = styled.div`
  width: auto;
  height: auto;
  max-width: 100%;

  > span img {
    width: auto;
    height: auto;
    max-width: 100%;
  }
`;
