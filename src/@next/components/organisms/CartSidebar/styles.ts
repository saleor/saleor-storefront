import { styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 26rem;
  max-width: 100vw;
  box-shadow: 6px 0px 30px rgba(0, 0, 0, 0.15);
`;

export const Content = styled.div`
  overflow: auto;
`;

export const Cart = styled.div`
  margin: ${props => `0 ${props.theme.spacing.gutter}`};
`;

export const Footer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 0.6rem;
  background-color: ${props => props.theme.colors.light};
  padding: ${({ theme: { spacing } }) =>
    `1.4rem ${spacing.gutter} 1rem ${spacing.gutter}`};
`;
