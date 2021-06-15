import { ProductVariant } from "@saleor/sdk/lib/fragments/gqlTypes/ProductVariant";
import { OrderByToken_orderByToken_lines_unitPrice } from "@saleor/sdk/lib/queries/gqlTypes/OrderByToken";
import classNames from "classnames";
import Link from "next/link";
import * as React from "react";
import { generatePath } from "react-router";

import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";
import { paths } from "@paths";

export type ILine = Omit<
  ProductVariant,
  "__typename" | "sku" | "quantityAvailable"
> & {
  quantity: number;
  totalPrice: OrderByToken_orderByToken_lines_unitPrice;
  quantityAvailable?: number;
};

interface ReadProductRowProps {
  mediumScreen: boolean;
  line: ILine;
}

export interface EditableProductRowProps {
  processing?: boolean;
}

const ProductRow: React.FC<ReadProductRowProps & EditableProductRowProps> = ({
  mediumScreen,
  processing,
  line,
}) => {
  const productUrl = generatePath(paths.product, { slug: line.product.slug });

  return (
    <tr
      className={classNames({
        "cart-table-row--processing": processing,
      })}
    >
      <td className="cart-table__thumbnail">
        <div>
          {mediumScreen && (
            <Link href={productUrl}>
              <a>
                <Thumbnail source={line.product} />
              </a>
            </Link>
          )}
          <Link href={productUrl}>
            <a>{line.product.name}</a>
          </Link>
        </div>
      </td>

      {mediumScreen && (
        <td>
          <TaxedMoney taxedMoney={line.pricing.price} />
        </td>
      )}

      <td>
        {line.attributes.map(({ attribute, values }, attributeIndex) => (
          <p key={attribute.id}>
            {attribute.name}: {values.map(value => value.name).join(", ")}
          </p>
        ))}
      </td>

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
