import { media, styled } from "@styles";
import { boldFontWeight, grayLight } from "@styles/constants";

export const Wrapper = styled.div`
  background-color: ${grayLight};
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const TileWrapper = styled.div`
  text-transform: uppercase;
  font-weight: ${boldFontWeight};
  margin-bottom: 1rem;
`;

export const Content = styled.div`
  padding: 1rem 2rem;
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
