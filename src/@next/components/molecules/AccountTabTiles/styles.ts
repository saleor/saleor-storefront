import { media, styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const Layout = styled.div`
  display: flex;
`;

export const LinkTagPU = styled.a`
  :hover {
    color: orange;
    text-decoration: underline;
  }
`

export const MarginTop = styled.div`
  margin-top: 32px;
`

export const Img = styled.img`
  margin-left:20px;
`

export const UpLoadPhoto = styled.div`
  border-right: 1px solid #dae3ed;
  margin-right: 30px;
  flex: 1;
`

export const WrapperUpload = styled.div`
  width: 50%;
  margin: auto;
`

export const TextAlign = styled.p`
  text-align: center;
`

export const FlexOneCol = styled.div`
  flex:1;
`

export const DisplayMarginP = styled.p`
  display: flex;
  margin-bottom:8px;
`
export const DisplayP = styled.p`
  display: flex;
`

export const FlexDivTwoCol = styled.div`
  flex: 2;
`

export const FlexSpanOneCol = styled.span`
color: #999999;
  flex: 1;
`

export const FlexSpanThreeCol = styled.span`
  flex: 3;
`

export const FlexFourCol = styled.div`
  flex: 4;
`

export const FlexChild = styled.div`
  flex: 5;
  display: flex;
`

export const FlexDiv = styled.div`
  flex: 6;
  display: flex;
`

export const LinkTag = styled.a`
  :hover {
    color: orange;
  }
`

export const MarginLink = styled.p`
  margin-bottom: 5px;
`

export const TileWrapper = styled.div`
  height: auto;
  margin-bottom: 1.5rem;
`;

export const Header = styled.div`
  width: 95%;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.dividerDark};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: ${props => props.theme.typography.h4FontSize};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

export const HeaderSmall = styled.div`
  width: 100%;
  border-bottom: none;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.dividerDark};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: ${props => props.theme.typography.h4FontSize};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

export const Content = styled.div`
  padding: 1.5rem 0;
  width: 95%;
`;

export const ContentOneLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
  ${media.smallScreen`
    flex-direction: column;
    width: 100%;
  `}
`;
export const ContentEdit = styled.div`
  width: 50%;
  ${media.smallScreen`
     width: 100%;
  `}
`;

export const ContentEditOneLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div {
    width: 48%;
    ${media.smallScreen`
      width: 100%;
    `}
  }

  ${media.smallScreen`
     flex-direction: column;
  `}
`;

export const ContentExtendInput = styled.div`
  width: 60%;
`;

export const Form = styled.form`
  background-color: ${props => props.theme.tile.backgroundColor};
`;

export const FormButtons = styled.div`
  height: 5rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  button {
    margin-left: 2rem;
  }
`;
