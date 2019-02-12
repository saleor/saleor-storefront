import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";
import { mdiPlus, mdiMinus, mdiDelete } from "@mdi/js";

import { CachedThumbnail, DebouncedTextField, Icon } from "..";
import { Checkout_lines_variant } from "../../checkout/types/Checkout";
import { generateProductUrl } from "../../core/utils";
import { VariantList_productVariants_edges_node } from "../../views/Product/types/VariantList";
import { CartLine } from "../CartProvider/context";

// TODO:(hoflish) use opacity or lower contrast for disabled icons
import cartAddDisabledImg from "../../images/cart-add-disabled.svg";

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
  changeQuantity?(lines: CartLine[]): void;
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
  const inStock = line.quantity < line.stockQuantity;
  const quantityChangeControls = mediumScreen ? (
    <div>
      <Icon path={mdiMinus} onClick={() => subtract(line.id)} />
      <p>{line.quantity}</p>
      <Icon
        className={classNames({ disabled: !inStock })}
        path={mdiPlus}
        onClick={inStock ? () => add(line.id) : undefined}
      />
    </div>
  ) : (
    <DebouncedTextField
      value={line.quantity}
      onChange={evt =>
        changeQuantity([
          { variantId: line.id, quantity: parseInt(evt.target.value, 10) }
        ])
      }
      resetValue={invalid}
      disabled={processing}
    />
  );

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
        {editable ? quantityChangeControls : <p>{line.quantity}</p>}
      </td>

      <td>{line.totalPrice}</td>

      <td>
        {editable && <Icon path={mdiDelete} onClick={() => remove(line.id)} />}
      </td>
    </tr>
  );
};

export default ProductRow;
