import { styled } from "@styles";

export const Wrapper = styled.div`
  width: 80%;
  padding-bottom: 2rem;
`;

export const Header = styled.div`
  font-size: ${props => props.theme.typography.h4FontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding-bottom: 1.5rem;
`;

export const Checkbox = styled.div`
  width: 100%;
  margin-bottom: 1.25rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  position: relative;
  margin-left: -4px;
`;

export const BottomBorder = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.divider};
  width: 95%;
`;

export const ViewMoreButton = styled.div`
  padding-bottom: 1.25rem;
`;

export const Label = styled.label`
  display: flex;
  cursor: pointer;
  justify-content: flex-start;
  align-items: center;
  padding-right: 1.25rem;
  input[type="checkbox"] {
    display: none;
    position: relative;
    right: -999em;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 26px;
    width: 26px;

    span {
      border: 1px solid ${props => props.theme.colors.secondary};
      width: 14px;
      height: 14px;
      display: inline-block;
      z-index: 10;
    }

    ${Checkbox}:hover & {
      border-radius: 50%;
      border: 1px solid;
      border-color: ${props => props.theme.colors.secondaryOverlay};
      background-color: ${props => props.theme.colors.secondaryOverlay};
    }

    :focus {
      border-radius: 50%;
      border: 1px solid;
      outline: none;
      border-color: ${props => props.theme.colors.secondaryOverlayDark};
      background-color: ${props => props.theme.colors.secondaryOverlayDark};
    }
  }

  input:checked + div {
    span {
      background-clip: content-box;
      padding: 2px;
      background-color: ${props => props.theme.colors.secondary};
    }
  }
`;
