import { styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  box-shadow: 6px 0px 30px rgba(0, 0, 0, 0.15);
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

export const Option = styled.div<{ disabled: boolean }>`
  cursor: ${props => (props.disabled ? `default` : `pointer`)};
`;
