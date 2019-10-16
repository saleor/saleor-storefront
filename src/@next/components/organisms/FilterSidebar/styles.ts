import { styled } from "@styles";

export const Wrapper = styled.div`
  overflow: scroll;
  width: 410px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;

  box-shadow: 6px 0px 30px rgba(0, 0, 0, 0.15);
`;
export const Header = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 4rem;
  padding: 0;

  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: ${props => props.theme.typography.h3FontSize};
`;
