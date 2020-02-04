import { media, styled } from "@styles";

export const Wrapper = styled.div``;

export const AttributeList = styled.ul`
  columns: 2;
  column-width: 50%;

  ${media.mediumScreen`
    column-width: 100%;
    columns: 1;
  `};
  width: 100%;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 30px;
    font-size: ${props => props.theme.typography.h4FontSize};
  }

  li::before {
    content: "•";
    margin-right: 20px;
    color: ${props => props.theme.colors.listBullet};
  }
`;

export const AttributeName = styled.span`
  color: ${props => props.theme.colors.listAttributeName};
`;
