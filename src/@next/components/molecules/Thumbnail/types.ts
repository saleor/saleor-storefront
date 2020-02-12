export interface IProps {
  source: {
    thumbnail: { url: string; alt: string | null } | null;
    thumbnail2x: { url: string } | null;
  };
  noPhotoDefault?: boolean;
  children?: any;
}
