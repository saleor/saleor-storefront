import {
  ProductDetails_product_thumbnail,
  ProductDetails_product_thumbnail2x,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";

interface ISource {
  thumbnail?: ProductDetails_product_thumbnail | null;
  thumbnail2x?: ProductDetails_product_thumbnail2x | null;
}

export interface IProps {
  source: ISource;
  noPhotoDefault?: boolean;
  children?: any;
}
