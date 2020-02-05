import { media, styled } from "@styles";
import { css } from "styled-components";

const textProps = css`
  font-size: ${props => props.theme.typography.baseFontSize};
  margin: 0 0 0.5rem 0;
  text-align: left;
`;

export const Wrapper = styled.div`
  background: ${props => props.theme.colors.light};
  padding: 2.5rem;
  text-align: center;
  max-height: 30rem;
  transition: 0.3s;

  :hover {
    background-color: ${props => props.theme.colors.hoverLightBackground};
  }

  ${media.mediumScreen`
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

export const Image = styled.div``;

export const AddToWishlist = styled.div<{ show: boolean }>`
  display: flex;
  justify-content: flex-end;
  visibility: hidden;
  transition: 0.3s;
  transform: scale(0);
  transform-origin: calc(100% - 1rem);

  ${props =>
    props.show &&
    `visibility: visible; transform: scale(1); transform-origin: calc(100% - 1rem);`};
`;
