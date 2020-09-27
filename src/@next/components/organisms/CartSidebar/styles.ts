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
  height: 100%;
`;

export const Cart = styled.div`
  margin: ${props => `0 ${props.theme.spacing.gutter}`};
`;

export const EmptyCart = styled.div`
  margin: ${props => `${props.theme.spacing.gutter}`};
`;
export const EmptyCartTitle = styled.h3`
  margin-bottom: ${props => `${props.theme.spacing.spacer}`};
`;
export const EmptyCartDescription = styled.p`
  color: ${props => `${props.theme.colors.lightFont}`};
  margin-bottom: ${props => `${props.theme.spacing.spacer}`};
`;

export const Footer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  background-color: ${props => props.theme.colors.light};
  padding: ${({ theme: { spacing } }) =>
    `1.4rem ${spacing.gutter} 1rem ${spacing.gutter}`};
`;
