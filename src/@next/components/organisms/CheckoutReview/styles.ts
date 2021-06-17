import { media, styled } from "@styles";

export const Wrapper = styled.div``;

export const Grid = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(2, 1fr);

  ${media.smallScreen`
    grid-template-columns: repeat(1, 1fr);
  `}
`;

export const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid
    ${props => props.theme.colors.baseFontColorTransparent};
  margin: 0 0 20px 0;
`;

export const Title = styled.h3`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0 0 1.6rem 0;
`;

export const SubTitle = styled.h4`
  padding: 0.6rem 0 1.4rem 0;
  font-size: ${props => props.theme.typography.baseFontSize};
  color: rgba(50, 50, 50, 0.6);
`;

export const TextSummary = styled.p`
  line-height: 1.6;
  font-size: ${props => props.theme.typography.h4FontSize};
`;

export const ErrorMessages = styled.div`
  margin-top: 30px;
  display: flex;
  background: ${props => props.theme.colors.error};
  p {
    color: white;
    margin: 2rem 1rem;
    font-size: 2rem;
  }
`;

export const NoteSection = styled.section`
  margin-top: 2rem;
`;

export const IframeBox = styled.div`
  padding: 1rem;
  box-shadow: 0px 23px 18px -18px rgba(30, 70, 79, 0.7);
  border: 2px solid #1e464f50;
  border-radius: 1rem;
  margin-top: 2rem;
`;

export const Info3D = styled.span`
  font-size: 1.3rem;
  margin-bottom: 2rem;
`;

export const IframeContainer = styled.div`
  width: 100%;
  display: flex;
`