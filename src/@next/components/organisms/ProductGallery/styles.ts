import { styled } from "@styles";
import { grayLight } from "@styles/constants";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Thumbnail = styled.div<{ activeThumbnail: boolean }>`
  width: 76px;
  display: flex;
  border-width: 4px;
  border-style: solid;
  border-color: ${props =>
    props.activeThumbnail === true
      ? props.theme.colors.thumbnailBorder
      : "transparent"};
  justify-content: center;
  height: 100px;
  overflow: hidden;
  img {
    width: 100%;
    object-fit: contain;
  }

  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Button = styled.div`
  height: 50px;
  width: 50px;
  position: absolute;
  z-index: 1;
  background-color: ${grayLight};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  top: 45px;
`;

export const TopButton = styled(Button)`
  left: 0;
`;

export const BottomButton = styled(Button)`
  right: 0;
`;

export const ThumbnailsContainer = styled.div`
  position: relative;
  // border: 1px solid;
  order: 2;
`;

export const ThumbnailList = styled.div`
  position: relative;
  height: 140px;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none;
  margin: 0 4rem;
  ::-webkit-scrollbar {
    width: 0px;
  }

  ul {
    position: absolute;
    display: flex;
    padding: 0;
    margin: 0;
  }
`;

export const Preview = styled.div`
  display: flex;
  justify-content: center;
  grid-area: preview;
  width: auto;
  max-height: 560px;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
  order: 1;
`;
