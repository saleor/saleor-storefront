import { styled } from "@styles";

export const Wrapper = styled.div<{ selected: boolean; onClick: () => void }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => `1.1rem ${props.theme.spacing.gutter}`};
  border-bottom: 1px solid ${props => props.theme.colors.light};
  ${({ selected, theme }) =>
    selected && `font-weight: ${theme.typography.boldFontWeight};`}

  ${({ onClick, theme }) =>
    !!onClick &&
    `&:hover {
      background-color: ${theme.colors.primaryLight};
      color: ${theme.colors.primaryDark};
      font-weight: ${theme.typography.boldFontWeight};
    }
  `}
`;
