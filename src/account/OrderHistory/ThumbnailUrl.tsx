import React from "react";
import { Link } from "react-router-dom";
import { CachedThumbnail } from "../../components/CachedImage";
import { generateProductUrl } from "../../core/utils";
import { OrdersByUser_orders_edges_node_lines } from "./types/OrdersByUser";

export interface IThumbnailUrl {
  line: OrdersByUser_orders_edges_node_lines;
}

const ThumbnailUrl: React.FC<IThumbnailUrl> = ({ line }) => {
  const productUrl = generateProductUrl(
    line.variant.product.id,
    line.variant.product.name
  );
  return (
    <Link to={productUrl}>
      <CachedThumbnail source={line} />
    </Link>
  );
};

export default ThumbnailUrl;
