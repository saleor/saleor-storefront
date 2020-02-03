import { styled } from "@styles";

export const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "sidebar preview";
  height: 100%;
  grid-template-columns: 76px 560px;
  grid-column-gap: 40px;
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

  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ThumnbanilsContainer = styled.div`
  position: relative;
  overflow-x: hidden;
  overflow-x: scroll;

  scrollbar-width: none;
`;

export const ThumbnailList = styled.div`
  position: absolute;
`;

export const Preview = styled.div`
  grid-area: preview;
  width: 100%;
  overflow: none;
  max-height: 560px;
  img {
    max-height: auto;
    max-width: 560px;
    width: 100%;
    object-fit: contain;
  }
`;
