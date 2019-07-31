import { styled } from "@styles";

export const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: ${({ theme: { spacing } }) => `calc(100vh - ${spacing.gutter})`};
  overflow: auto;
`;

export const Footer = styled.div`
  background-color: ${props => props.theme.colors.light};
  padding: ${({ theme: { spacing } }) =>
    `1.3rem ${spacing.gutter} 1rem ${spacing.gutter}`};
`;
