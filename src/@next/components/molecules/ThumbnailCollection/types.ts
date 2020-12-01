import { CollectionDetails_collection_backgroundImage } from "@saleor/sdk/lib/queries/gqlTypes/CollectionDetails";

interface ISource {
  backgroundImage?: CollectionDetails_collection_backgroundImage | null;
}

export interface IProps {
  source: ISource;
  noPhotoDefault?: boolean;
  children?: any;
}
