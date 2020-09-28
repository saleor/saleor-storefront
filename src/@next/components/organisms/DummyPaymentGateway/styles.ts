import { IProps } from "@components/atoms/Icon/types";
import { styled } from "@styles";

export const Form = styled.form``;

export const Status = styled.div`
  display: block;
  margin: 18px;
`;

export const BareInput = styled.input<IProps>`
  padding: 0.8rem 1rem;
  margin: 0;
  border: none;
  width: 100%;
  font-size: ${props => props.theme.typography.baseFontSize};
  outline: none;
`;

//background-color: transparent;
// &:-webkit-autofill {
//   & + label {
//     ${props => activeLabelStyles(props.theme, props.labelBackground)};
//   }
// }
