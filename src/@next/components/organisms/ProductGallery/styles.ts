import { styled } from "@styles";

export const Wrapper = styled.div`
  // display: grid;
  // grid-template-areas: "sidebar preview";
  // height: 100%;
  // // grid-template-columns: 76px 1fr;
  // grid-template-rows: 76px 1fr;
  // grid-column-gap: 40px;
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
  height: 150px;
  width: 50px;
  position: absolute;
  z-index: 1;
  background-color: rgba(50, 50, 50, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const TopButton = styled(Button)`
  top: 0%;
  left: 0;

  // transform: rotate(90deg);
`;

export const BottomButton = styled(Button)`
  bottom: 0%;
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
  // border: 1px solid;
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
