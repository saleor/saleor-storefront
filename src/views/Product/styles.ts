import { media, styled } from "@styles";
import { boldFontWeight, white } from "@styles/constants";

export const Wrapper = styled.div`
  background-color: ${white};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  // border: 1px solid #cccccc;
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
  justify-content: flex-start;
  button {
    border-radius: 5px;
    span {
      text-transform: capitalize;
    }
    // margin-left: 2rem;
  }
`;
