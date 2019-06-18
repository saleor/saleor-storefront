import { styled } from "@styles";

export const BoldTitle = styled.div`
  font-weight: ${props => props.theme.typography.boldFontWeight};
`;

export const TextContent = styled.div`
  margin-top: 0.5rem;
  margin-bottom: ${props => props.theme.spacing.spacer};
`;
