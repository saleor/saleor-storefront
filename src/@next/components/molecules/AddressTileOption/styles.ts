import { styled } from "@styles";

export const Wrapper = styled.div<{ selected: boolean }>`
  background-color: ${props => props.theme.colors.light};
  padding: 30px;
  ${props => props.selected && `border: 2px solid #21125E;`}
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const LabeledInput = styled.div<{ selected: boolean }>`
  padding-top: 1rem;
  ${props => props.selected && `color: #21125E;`}

  input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }
  > span {
    display: inline-block;
    width: 1em;
    height: 1em;
    margin: 0.25em 1em 0.25em 0.25em;
    border: 0.1em solid #21125e;
    border-radius: 0.5em;
    background: #ffffff;
    vertical-align: bottom;
  }
  ${props =>
    props.selected &&
    `> span > span {
    display: block;
    width: 0.5em;
    height: 0.5em;
    margin: 0.125em;
    /* border: 1px solid #21125e; */
    border-radius: 0.25em;
    background: #21125e;
  }`}
`;
