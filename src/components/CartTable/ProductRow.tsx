import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";
import { ProductVariant } from "@sdk/fragments/types/ProductVariant";
import { OrderByToken_orderByToken_lines_unitPrice } from "@sdk/queries/types/OrderByToken";

import { generateProductUrl } from "../../core/utils";

// import { ProductVariant } from "../../checkout/types/ProductVariant";

export type LineI = Omit<
  ProductVariant,
  "__typename" | "sku" | "stockQuantity" | "isAvailable" | "attributes"
> & {
  quantity: number;
  totalPrice: OrderByToken_orderByToken_lines_unitPrice;
  stockQuantity?: number;
};

interface ReadProductRowProps {
  mediumScreen: boolean;
  line: LineI;
}

export interface EditableProductRowProps {
  processing?: boolean;
}

const ProductRow: React.FC<ReadProductRowProps & EditableProductRowProps> = ({
  mediumScreen,
  processing,
  line,
}) => {
  const productUrl = generateProductUrl(line.product.id, line.product.name);

  return (
    <tr
      className={classNames({
        "cart-table-row--processing": processing,
      })}
    >
      <td className="cart-table__thumbnail">
        <div>
          {mediumScreen && (
            <Link to={productUrl}>
              <Thumbnail source={line.product} />
            </Link>
          )}
          <Link to={productUrl}>{line.product.name}</Link>
        </div>
      </td>

      {mediumScreen && (
        <td>
          <TaxedMoney taxedMoney={line.pricing.price} />
        </td>
      )}

      <td>{line.name}</td>

      <td className="cart-table__quantity-cell">
        <p>{line.quantity}</p>
      </td>

      <td colSpan={2}>
        <TaxedMoney taxedMoney={line.totalPrice} />
      </td>
    </tr>
  );
};

export default ProductRow;
