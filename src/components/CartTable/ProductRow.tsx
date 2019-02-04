import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { Checkout_lines_variant } from "../../checkout/types/Checkout";

import { CachedThumbnail, DebouncedTextField } from "..";
import { generateProductUrl } from "../../core/utils";
import cartAddImg from "../../images/cart-add.svg";
import cartRemoveImg from "../../images/cart-remove.svg";
import cartSubtractImg from "../../images/cart-subtract.svg";
import { VariantList_productVariants_edges_node } from "../../views/Product/types/VariantList";

export type LineI = (
  | VariantList_productVariants_edges_node
  | Checkout_lines_variant) & {
  quantity: number;
  totalPrice: string;
};

interface ReadProductRowProps {
  mediumScreen: boolean;
  line: LineI;
}

export interface EditableProductRowProps {
  processing?: boolean;
  invalid?: boolean;
  add?(variantId: string): void;
  changeQuantity?(variantId: string, quantity: number): void;
  remove?(variantId: string): void;
  subtract?(variantId: string): void;
}

const ProductRow: React.FC<ReadProductRowProps & EditableProductRowProps> = ({
  invalid,
  add,
  changeQuantity,
  mediumScreen,
  processing,
  remove,
  subtract,
  line
}) => {
  const productUrl = generateProductUrl(line.product.id, line.product.name);
  const editable = !!(add && subtract && remove && changeQuantity);

  return (
    <tr
      className={classNames({
        "cart-table-row--processing": processing
      })}
    >
      <td className="cart-table__thumbnail">
        <div>
          {mediumScreen && (
            <Link to={productUrl}>
              <CachedThumbnail source={line.product} />
            </Link>
          )}
          <Link to={productUrl}>
            {line.product.name}
            {line.name && ` (${line.name})`}
          </Link>
        </div>
      </td>

      {mediumScreen && <td>{line.price.localized}</td>}

      <td className="cart-table__quantity-cell">
        {editable ? (
          mediumScreen ? (
            <div>
              <ReactSVG path={cartAddImg} onClick={() => add(line.id)} />
              <p>{line.quantity}</p>
              <ReactSVG
                path={cartSubtractImg}
                onClick={() => subtract(line.id)}
              />
            </div>
          ) : (
            <DebouncedTextField
              value={line.quantity}
              onChange={evt =>
                changeQuantity(line.id, parseInt(evt.target.value, 10))
              }
              resetValue={invalid}
              disabled={processing}
            />
          )
        ) : (
          <p>{line.quantity}</p>
        )}
      </td>

      <td>{line.totalPrice}</td>

      <td>
        {editable && (
          <ReactSVG path={cartRemoveImg} onClick={() => remove(line.id)} />
        )}
      </td>
    </tr>
  );
};

export default ProductRow;
