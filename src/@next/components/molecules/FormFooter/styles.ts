import { styled } from "@styles";

const horizontalPadding = "2rem";

export const Footer = styled.div`
  position: relative;
  text-align: right;
  padding: 1.8rem 0 1.4rem;
  &:before {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${props => props.theme.colors.light};
    height: 1px;
    width: calc(100% + ${horizontalPadding} * 2);
  }
  button {
    &:first-child {
      margin-right: 2rem;
    }
  }
`;
