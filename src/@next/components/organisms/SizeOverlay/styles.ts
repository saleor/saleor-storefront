import { styled } from "@styles";

export const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const Footer = styled.div`
  background-color: ${props => props.theme.colors.light};
  padding: ${({ theme: { spacing } }) =>
    `2rem ${spacing.gutter} 1.8rem ${spacing.gutter}`};
`;
