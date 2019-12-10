export interface IProps {
  source: {
    thumbnail: { url: string; alt: string };
    thumbnail2x: { url: string };
  };
  noPhotoDefault?: boolean;
  children?: any;
}
