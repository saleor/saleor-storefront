import { media, styled } from "@styles";

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.light};
  padding: 2.5rem;
  text-align: center;
  max-height: 30rem;

  ${media.mediumScreen`
    padding: 1.8rem;
  `}
`;

export const Title = styled.h4`
  text-transform: uppercase;
  font-weight: normal;
  font-size: ${props => props.theme.typography.baseFontSize};
  margin: 0 0 0.5rem 0;
  text-align: left;
`;

export const Price = styled.p`
  font-size: ${props => props.theme.typography.baseFontSize};
  margin: 0 0 0.5rem 0;
  text-align: left;
`;

export const Image = styled.div``;
