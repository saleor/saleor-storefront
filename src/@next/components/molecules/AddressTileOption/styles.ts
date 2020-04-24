import { media, styled } from "@styles";

export const Label = styled.label<{ checked: boolean }>`
  height: 100%;
  min-height: 190px;
  display: block;
  background-color: ${props => props.theme.colors.light};
  padding: 30px;
  padding: ${props => (props.checked ? `28px` : `30px`)};
  ${props => props.checked && `border: 2px solid #21125E;`}
  font-size: ${props => props.theme.typography.smallFontSize};
  cursor: pointer;

  ${media.smallScreen`
    padding: 30px 20px;
  `}
`;

export const Input = styled.input`
  display: none;
`;
