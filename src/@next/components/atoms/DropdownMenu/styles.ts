import { styled } from "@styles";

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Content = styled.div`
  box-shadow: ${props => props.theme.dropdown.boxShadow};
  background-color: ${props => props.theme.dropdown.backgroundColor};

  position: absolute;
  left: auto;
  right: 0;

  ul {
    margin: 0;
    list-style-type: none;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    font-style: normal;
    font-weight: normal;

    line-height: ${props => props.theme.typography.baseLineHeight};
    align-items: flex-start;

    li {
      cursor: pointer;
      padding-bottom: 1.25rem;
      white-space: nowrap;
    }

    :last-child {
      padding-bottom: 0;
    }
  }
`;
