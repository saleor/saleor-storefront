import { styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const Header = styled.div`
  width: 95%;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.dividerDark};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: ${props => props.theme.typography.h4FontSize};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.div`
  padding: 1.5rem 0;
  width: 95%;
`;

export const ContentEdit = styled.div`
  width: 40%;
`;

export const Form = styled.form`
  background-color: ${props => props.theme.tile.backgroundColor};
`;
