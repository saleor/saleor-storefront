import { styled } from "@styles";

export const Wrapper = styled.div`
  width: 80%;
  padding-bottom: 2rem;
`;

export const Header = styled.div`
  font-size: ${props => props.theme.typography.h4FontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding-bottom: 1.5rem;
`;

export const BottomBorder = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.divider};
  width: 95%;
`;

export const ViewMoreButton = styled.div`
  padding-bottom: 1.25rem;
`;
