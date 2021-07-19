// import isEqual from "lodash/isEqual";
import * as React from "react";
import ReactSVG from "react-svg";

import { Thumbnail } from "@components/molecules";

// import { TaxedMoney } from "../../@next/components/containers";
import message from "../../images/messageHeader.svg";
import { FeaturedProducts_collection_products_edges_node } from "../ProductsFeatured/gqlTypes/FeaturedProducts";

import "./scss/index.scss";

interface ProductListItemProps {
  product: FeaturedProducts_collection_products_edges_node;
}

const ProductListNews: React.FC<ProductListItemProps> = ({ product }) => {
  // const { category } = product;
  // const price = product.pricing?.priceRange?.start;
  // const priceUndiscounted = product.pricing?.priceRangeUndiscounted?.start;

  // const getProductPrice = () => {
  //   if (isEqual(price, priceUndiscounted)) {
  //     return <TaxedMoney taxedMoney={price} />;
  //   }
  //   return (
  //     <>
  //       <span className="product-list-item__undiscounted_price">
  //         <TaxedMoney taxedMoney={priceUndiscounted} />
  //       </span>
  //       &nbsp;&nbsp;&nbsp;&nbsp;
  //       <TaxedMoney taxedMoney={price} />
  //     </>
  //   );
  // };
  return (
    <div className="product-list-item-news">
      <div className="product-list-item-news-wrapper">
        <div className="product-list-item-news__info">
          <div className="product-list-item-news__icon-seller" />
          <span className="product-list-item-news__seller">Người bán</span>
        </div>
        <div className="product-list-item-news__image">
          <Thumbnail source={product} />
        </div>
        <h4 className="product-list-item-news__title-news">{product.name}</h4>
        {/* <p className="product-list-item__category">{category?.name}</p> */}
        <p className="product-list-item-news__description">
          Nho đen quả to và cứng quả. Bên ngoài có một lớp phấn mỏng tự nhiên để
          bảo vệ quả, thịt giòn chắc, nhiều nước và có vị ngọt thơm đậm. Lợi ích
          sức khỏe của nho đen cao hơn hẳn các dòng nho khác
        </p>
        <div className="product-list-item-news__button">
          {/* <img src={message} alt="" /> */}
          <ReactSVG path={message} />
          <span>Liên hệ người bán</span>
        </div>
      </div>
    </div>
  );
};

export default ProductListNews;
