import { DefaultTheme, styled } from "@styles";

type WrapperProps = {
  active: boolean;
  error: boolean;
  disabled: boolean;
  theme: DefaultTheme;
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  border-radius: 6px;
  color: #808080;
  border: ${props =>
    props.active ? `2px solid #bfad71;` : `2px solid #aaa;`};
  transition: all 0.3s ease;
`;

export const Content = styled.span`
  display: flex;
  align-items: center;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  padding: 1.2rem 1rem;
  padding-bottom: 0.4rem;
  margin: 0;
  border: none;
  width: 100%;
  font-size: ${props => props.theme.typography.baseFontSize};
  outline: none;
  background-color: transparent;
`;
