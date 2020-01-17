import { styled } from "@styles";

export const Wrapper = styled.div<{ selected: boolean; disabled: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => `1.1rem ${props.theme.spacing.gutter}`};
  border-bottom: 1px solid ${props => props.theme.colors.light};
  ${({ selected, theme }) =>
    selected && `font-weight: ${theme.typography.boldFontWeight};`}
  color: ${props => (props.disabled ? props.theme.colors.disabled : `unset`)};

  ${props =>
    !props.disabled &&
    `&:hover {
    background-color: ${props.theme.colors.primaryLight};
    color: ${props.theme.colors.primaryDark};
    font-weight: ${props.theme.typography.boldFontWeight};
  }`}
`;
