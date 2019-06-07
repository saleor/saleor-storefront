import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { CachedThumbnail } from "../../components/CachedImage";
import { generateProductUrl } from "../../core/utils";
import { OrdersByUser_orders_edges_node_lines } from "./types/OrdersByUser";

export interface IThumbnailUrl extends RouteComponentProps {
  line: OrdersByUser_orders_edges_node_lines;
}

const ThumbnailUrl: React.FC<IThumbnailUrl> = ({ line, history }) => {
  const productUrl = generateProductUrl(
    line.variant.product.id,
    line.variant.product.name
  );
  return (
    <div
      onClick={evt => {
        evt.stopPropagation();
        history.push(productUrl);
      }}
    >
      <CachedThumbnail source={line} />
    </div>
  );
};

export default withRouter(ThumbnailUrl);
