import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";

import { generateProductUrl } from "../../../core/utils";
import removeImg from "../../../images/garbage.svg";

const ProductList: React.SFC<{
  lines: ICheckoutModelLine[];
  remove(variantId: string): void;
}> = ({ lines, remove }) => (
  <ul className="cart__list">
    {lines.map((line, index) => {
      const productUrl = generateProductUrl(
        line.variant.product.id,
        line.variant.product.name
      );
      const key = line.id ? `id-${line.id}` : `idx-${index}`;

      return (
        <li
          key={key}
          className="cart__list__item"
          data-test="cartRow"
          data-test-id={line.variant.sku}
        >
          <Link to={productUrl}>
            <Thumbnail source={line.variant.product} />
          </Link>
          <div className="cart__list__item__details">
            <p data-test="price">
              <TaxedMoney taxedMoney={line.variant.pricing.price} />
            </p>
            <Link to={productUrl}>
              <p data-test="name">{line.variant.product.name}</p>
            </Link>
            <span className="cart__list__item__details__variant">
              <span>{line.variant.name}</span>
              <span data-test="quantity">
                <FormattedMessage
                  defaultMessage="Qty: {quantity}"
                  values={{ quantity: line.quantity }}
                />
              </span>
            </span>
            <ReactSVG
              path={removeImg}
              className="cart__list__item__details__delete-icon"
              data-test="deleteButton"
              onClick={() => remove(line.variant.id)}
            />
          </div>
        </li>
      );
    })}
  </ul>
);
export default ProductList;
