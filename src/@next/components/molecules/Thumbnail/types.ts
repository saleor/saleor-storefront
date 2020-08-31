interface IThumbnail {
  url: string;
  alt: string | null;
}

interface IThumbnail2x {
  url: string;
}

interface ISource {
  thumbnail?: IThumbnail | null;
  thumbnail2x?: IThumbnail2x | null;
}

export interface IProps {
  source: ISource;
  noPhotoDefault?: boolean;
  children?: any;
}
