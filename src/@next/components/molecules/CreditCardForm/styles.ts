import { styled } from "@styles";
import { spacer } from "@styles/constants";

export const Wrapper = styled.div``;

export const PaymentInput = styled.div<{ error?: boolean }>`
  position: relative;
  margin-bottom: 1rem;
  ${props =>
    props.error &&
    `
  display: block;
  margin-bottom: ${props.theme.spacing.spacer};
  .input_content {
    position: relative;
  }
  `}
  .input {
    margin-bottom: 0;
  }
`;

PaymentInput.displayName = "S.PaymentInput";
interface ILabelFocus {
  isFocused: boolean;
}
export const PaymentLabel = styled.span<ILabelFocus>`
  display: inline-block;
  position: absolute;
  color: ${props => props.theme.input.labelColor};
  top: 1rem;
  left: 0.8rem;
  padding: 0 6px;
  z-index: 1;
  pointer-events: none;
  transition: all 0.4s ease;
  ${props =>
    props.isFocused &&
    `
    background-color: ${props.theme.colors.white};
    font-size: ${props.theme.input.labelFontSize};
    left: 17px;
    top: 0;
    transform: translate(0, -50%);
  `}
`;
PaymentLabel.displayName = "S.PaymentLabel";

export const ErrorMessage = styled.div`
  display: block;
  color: ${props => props.theme.colors.errorColor};
  font-size: ${props => props.theme.input.labelFontSize};
  margin-top: ${spacer / 2}rem;
  margin-bottom: ${props => props.theme.spacing.spacer};
  & ~ & {
    margin-top: -1rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-gap: 0 ${props => props.theme.spacing.spacer};
  grid-template-columns: 1fr 1fr;
`;
