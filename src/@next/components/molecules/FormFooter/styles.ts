import { styled } from "@styles";

export const Footer = styled.div`
  position: relative;
  text-align: right;
  padding: 1.1rem 0.8rem 1.1rem 0;
  &:before {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${props => props.theme.colors.light};
    height: 1px;
    width: ${props => `calc(100% + ${props.theme.spacing.spacer} * 4)`};
  }
  button {
    &:first-child {
      margin-right: 2rem;
    }
  }
`;
