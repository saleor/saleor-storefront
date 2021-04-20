import { media, styled } from "@styles";

export const Wrapper = styled.div``;

export const AttributeList = styled.ul`
  columns: 2;
  column-width: 50%;

  ${media.largeScreen`
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

export const Tabs = styled.div`
  display: flex;
  flex-wrap: none;
  width: 100%;
  overflow: hidden;
`;

export const TabTitle = styled.div<{ active?: boolean }>`
  cursor: pointer;
  font-size: ${props => props.theme.typography.baseFontSize};
  letter-spacing: 0.02em;
  color: ${props => props.active && props.theme.colors.tabTitle};
  border-bottom-width: ${props => (props.active ? "4px" : "0")};
  border-bottom-style: solid;
  border-bottom-color: ${props =>
    props.active ? props.theme.colors.tabTitle : "transparent"};
  padding: 12px 16px;
  margin-right: 4px;
  border-top: 1px solid #dcdee3;
  border-left: 1px solid #dcdee3;
  border-right: 1px solid #dcdee3;
  border-radius: 8px 8px 0 0;
  background-color: ${props => (props.active ? "#ffffff" : "transparent")};

  ${media.smallScreen`
    font-size: ${(props: any) => props.theme.typography.baseFontSize};
  `};
`;

export const AttributeName = styled.span`
  color: ${props => props.theme.colors.listAttributeName};
`;

export const WrapBox = styled.div`
  padding: 0 1rem;
`;
export const CompanyImage = styled.div`
  display: flex;
  flex-direction: column;
`;
export const TitleText = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  text-transform: uppercase;
`;
// export const SubTitleText = styled.h4`
//   font-size: 14px;
//   margin-bottom: 20px;
//   color: #666;
// `;
export const CompanyWrapInfo = styled.div`
  position: relative;
`;
export const CompanyInfo = styled.table`
  width: 100%;
  margin: 1rem 0;
`;
export const CompanyInfoBody = styled.tbody``;
export const CompanyInfoTr = styled.tr`
  border-bottom: none;
`;
export const CompanyInfoTd = styled.td`
  background-color: #fafafa;
  border: 1px solid #f4f4f4;
  &: nth-child(2n) {
    background-color: #fff;
  }
`;
// export const CompanyLocation = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
export const WrapperContent = styled.div`
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 12px;
`;
