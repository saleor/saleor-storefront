import { styled } from "@styles";
import { spacer } from "@styles/constants";

export const Wrapper = styled.div``;

export const PaymentInput = styled.div`
  position: relative;
  margin-bottom: 1rem;
  ${(props: { error?: boolean }) =>
    props.error &&
    `
  display: block;
  margin-bottom: ${spacer};
  .input_content {
    position: relative;
  }
  `}
`;

interface ILabelFocus {
  isFocused: boolean;
}
export const PaymentLabel = styled.span<ILabelFocus>`
  display: inline-block;
  position: absolute;
  color: $label-color;
  top: 50%;
  left: 0.8rem;
  transform: translate(0, -50%);
  padding: 0 6px;
  z-index: 1;
  pointer-events: none;
  transition: all 0.4s ease;
  ${props =>
    props.isFocused &&
    `
    background-color: ${props.theme.colors.white};
font-size: ${props.theme.typography.labelFontSize};
left: 17px;
top: 0;
`}
`;

export const ErrorMessage = styled.div`
  display: block;
  color: ${props => props.theme.colors.errorColor};
  font-size: ${props => props.theme.typography.labelFontSize};
  margin-bottom: ${spacer};
  & ~ & {
    margin-top: -1rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-gap: 0 ${spacer};
  grid-template-columns: 1fr 1fr;
`;
