import { styled } from "@styles";

export const RadioWrapper = styled.div`
  padding-top: 1rem;
`;

export const Label = styled.label<{ checked: boolean }>`
  display: block;
  background-color: ${props => props.theme.colors.light};
  padding: 30px;
  ${props => props.checked && `border: 2px solid #21125E;`}
  font-size: ${props => props.theme.typography.smallFontSize};
  cursor: pointer;
`;
