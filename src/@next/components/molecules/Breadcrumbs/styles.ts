import { styled } from "@styles";

// FIXME Styling on hover and separators broken
export const BreadcrumbList = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  margin: ${props => props.theme.spacing.spacer} 0;

  li {
    &:after {
      content: url("../../../images/breadcrumbs-arrow.svg");
      display: inline-block;
      margin: 0 ${props => props.theme.spacing.spacer} / 2;
    }

    a {
      color: ${props => props.theme.colors.lightFont};
      text-decoration: none;
      vertical-align: middle;
      transition: 0.3s;

      &:hover,
      &:focus {
        color: $blue;
      }
    }
  }

  .active {
    a {
      color: ${props => props.theme.colors.baseFont};
      font-weight: ${props => props.theme.typography.boldFontWeight};
    }
    &:hover {
      color: "red";
    }
  }
`;

export const BreadcrumbElement = styled.li`
  &:after {
    content: url("../../../images/breadcrumbs-arrow.svg");
    display: inline-block;
    margin: 0 ${props => props.theme.spacing.spacer} / 2;
  }

  a {
    color: ${props => props.theme.colors.lightFont};
    text-decoration: none;
    vertical-align: middle;
    transition: 0.3s;

    &:hover,
    &:focus {
      color: $blue;
    }
  }

  &:last-of-type a {
    color: ${props => props.theme.colors.baseFont};
    font-weight: ${props => props.theme.typography.boldFontWeight};
  }
`;
