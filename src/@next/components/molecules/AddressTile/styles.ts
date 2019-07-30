import { styled } from "@styles";

export const Wrapper = styled.div`
  height: 100%;
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const HeaderContent = styled.div`
  color: ${props => props.theme.colors.lightFont};
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
`;
export const FooterContent = styled.div`
  > div {
    display: inline-block;
    padding: 0;
    margin: 0;
    margin-right: 0.6rem;
  }
`;

export const MenuItem = styled.div`
  border-radius: 8px;
  padding: 0.25rem;
  :hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }
`;
