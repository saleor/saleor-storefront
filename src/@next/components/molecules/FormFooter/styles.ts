import { styled } from "@styles";

export const Footer = styled.div<{ divider: boolean }>`
  position: relative;
  text-align: right;
  padding: ${props => `1.1rem ${props.theme.spacing.gutter}`};
  ${({ divider, theme }) =>
    divider && `border-top: 1px solid ${theme.colors.light};`}
  button {
    &:last-child {
      margin-left: 2rem;
      margin-right: 0.7rem;
    }
  }
`;
