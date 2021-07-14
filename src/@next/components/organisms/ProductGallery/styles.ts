import { styled } from "@styles";
import { grayLight } from "@styles/constants";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 381px;
  height: 448px;
`;

export const Thumbnail = styled.div<{ activeThumbnail: boolean }>`
  width: 73px;
  height: 73px;
  display: flex;
  border-width: 1px;
  border-style: solid;
  border-color: ${props =>
    props.activeThumbnail === true
      ? props.theme.colors.thumbnailBorder
      : "transparent"};
  justify-content: center;
  // height: 100px;
  overflow: hidden;
  img {
    width: 100%;
    object-fit: cover;
  }

  // margin-top: 20px;
  // margin-bottom: 20px;
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
  height: 73px;
  width: 73px;
  // overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none;
  // margin: 0 4rem;
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
  max-height: 371px;
  max-width: 371px
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  order: 1;
`;
